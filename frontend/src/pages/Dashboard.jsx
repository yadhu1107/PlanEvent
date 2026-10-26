import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteEvent, getEvents } from '../services/api.js';

function prettyDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      setErrorMessage(`${error.message}. Check the backend and complete the event route TODOs.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  async function handleDelete(eventId) {
    if (!window.confirm('Delete this event?')) return;
    try {
      await deleteEvent(eventId);
      await loadEvents();
    } catch (error) {
      setErrorMessage(`${error.message}. Check the DELETE route in the backend.`);
    }
  }

  return (
    <section>
      <div className="page-heading heading-row">
        <div>
          <p className="eyebrow">EVENT MANAGEMENT</p>
          <h1>Your events, <span>in one place.</span></h1>
          <p className="subheading">Review the schedule and keep event details up to date.</p>
        </div>
        <Link className="primary-button" to="/add-event"><span aria-hidden="true">＋</span> Add Event</Link>
      </div>

      <div className="summary-strip">
        <div className="summary-icon" aria-hidden="true">✳</div>
        <div>
          <p className="summary-title">Event overview</p>
          <p className="summary-copy">Events saved to your registration workspace.</p>
        </div>
        <span className="event-count">{events.length} {events.length === 1 ? 'event' : 'events'}</span>
      </div>

      {errorMessage && <div className="notice error-notice" role="alert">{errorMessage}</div>}

      <div className="table-card">
        <div className="table-card-heading">
          <div><h2>All events</h2><p>Manage the details for each event below.</p></div>
        </div>
        {loading ? <div className="table-message">Loading events…</div> : (
          <div className="table-scroll">
            <table>
              <thead><tr>
                <th>Event ID</th><th>Event Name</th><th>Event Date</th><th>Venue</th><th>Total Registrations</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {events.length === 0 ? (
                  <tr><td className="empty-cell" colSpan="6">No events to display yet. Use “Add Event” to create one.</td></tr>
                ) : events.map((event) => (
                  <tr key={event._id}>
                    <td className="id-cell">{event._id}</td>
                    <td className="event-name-cell">{event.eventName}</td>
                    <td>{prettyDate(event.eventDate)}</td>
                    <td>{event.venue}</td>
                    <td><span className="count-pill">{event.totalRegistrations ?? 0}</span></td>
                    <td><div className="action-group">
                      <Link className="table-action edit-action" to={`/edit/${event._id}`}>Update</Link>
                      <button className="table-action delete-action" onClick={() => handleDelete(event._id)} type="button">Delete</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
