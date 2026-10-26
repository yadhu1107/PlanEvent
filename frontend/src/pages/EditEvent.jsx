import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../services/api.js';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({ eventName: '', eventDescription: '', eventDate: '', venue: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadEvent() {
      try {
        const event = await getEventById(id);
        setValues({
          eventName: event.eventName || '',
          eventDescription: event.eventDescription || '',
          eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : '',
          venue: event.venue || ''
        });
      } catch (error) {
        setErrorMessage(`${error.message}. Complete and test GET /api/events/:id in the backend.`);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setSaving(true);
    try {
      await updateEvent(id, values);
      navigate('/');
    } catch (error) {
      setErrorMessage(`${error.message}. Complete and test PUT /api/events/:id in the backend.`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-page">
      <div className="page-heading"><p className="eyebrow">UPDATE EVENT</p><h1>Edit event <span>details.</span></h1><p className="subheading">Update the information for this existing event.</p></div>
      <div className="form-card">
        {loading ? <div className="table-message">Loading event…</div> : <>
          {errorMessage && <div className="notice error-notice" role="alert">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field-group"><label htmlFor="eventName">Event Name</label><input id="eventName" name="eventName" value={values.eventName} onChange={handleChange} required /></div>
            <div className="field-group"><label htmlFor="eventDescription">Event Description</label><textarea id="eventDescription" name="eventDescription" value={values.eventDescription} onChange={handleChange} rows="4" required /></div>
            <div className="form-grid">
              <div className="field-group"><label htmlFor="eventDate">Event Date</label><input id="eventDate" name="eventDate" type="date" value={values.eventDate} onChange={handleChange} required /></div>
              <div className="field-group"><label htmlFor="venue">Venue</label><input id="venue" name="venue" value={values.venue} onChange={handleChange} required /></div>
            </div>
            <div className="form-actions"><Link className="secondary-button" to="/">Cancel</Link><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Updating…' : 'Update Event'}</button></div>
          </form>
        </>}
      </div>
    </section>
  );
}
