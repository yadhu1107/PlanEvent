import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api.js';

const initialValues = { eventName: '', eventDescription: '', eventDate: '', venue: '' };

export default function AddEvent() {
  const [values, setValues] = useState(initialValues);
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setSaving(true);
    try {
      await createEvent(values);
      navigate('/');
    } catch (error) {
      setErrorMessage(`${error.message}. Complete and test POST /api/events in the backend.`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-page">
      <div className="page-heading">
        <p className="eyebrow">CREATE AN EVENT</p>
        <h1>Add a new <span>event.</span></h1>
        <p className="subheading">Fill in the details below to add an event to your dashboard.</p>
      </div>
      <div className="form-card">
        <div className="form-card-title"><div className="form-icon" aria-hidden="true">✳</div><div><h2>Event details</h2><p>Enter the basic information for this event.</p></div></div>
        {errorMessage && <div className="notice error-notice" role="alert">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="eventName">Event Name</label>
            <input id="eventName" name="eventName" value={values.eventName} onChange={handleChange} placeholder="e.g. Design Meetup" required />
          </div>
          <div className="field-group">
            <label htmlFor="eventDescription">Event Description</label>
            <textarea id="eventDescription" name="eventDescription" value={values.eventDescription} onChange={handleChange} placeholder="Write a short description of the event…" rows="4" required />
          </div>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="eventDate">Event Date</label>
              <input id="eventDate" name="eventDate" type="date" value={values.eventDate} onChange={handleChange} required />
            </div>
            <div className="field-group">
              <label htmlFor="venue">Venue</label>
              <input id="venue" name="venue" value={values.venue} onChange={handleChange} placeholder="e.g. Main Auditorium" required />
            </div>
          </div>
          <div className="form-actions"><Link className="secondary-button" to="/">Cancel</Link><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Event'}</button></div>
        </form>
      </div>
    </section>
  );
}
