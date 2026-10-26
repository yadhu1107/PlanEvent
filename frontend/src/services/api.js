const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

const API_ROOT = `${API_BASE_URL}/api/events`;

async function readResponse(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || `Request failed (${response.status})`);
  }
  return body;
}

export async function getEvents() {
  return readResponse(await fetch(API_ROOT));
}

export async function getEventById(id) {
  return readResponse(await fetch(`${API_ROOT}/${id}`));
}

export async function createEvent(eventDetails) {
  return readResponse(await fetch(API_ROOT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventDetails)
  }));
}

export async function updateEvent(id, eventDetails) {
  return readResponse(await fetch(`${API_ROOT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventDetails)
  }));
}

export async function deleteEvent(id) {
  return readResponse(await fetch(`${API_ROOT}/${id}`, { method: 'DELETE' }));
}
