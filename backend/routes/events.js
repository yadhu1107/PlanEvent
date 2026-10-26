import { Router } from 'express';
import Event from '../models/Event.js';

const router = Router();

// TODO 1: GET /api/events
// Find all Event documents and return the array as JSON.
router.get('/', async (_request, response) => {
  try {
    const events = await Event.find();
    return response.status(200).json(events);
  } catch (error) {
    return response.status(500).json({
      message: 'Failed to fetch events'
    });
  }
});

// TODO 2: GET /api/events/:id
// Find an event by req.params.id. Return 404 if it does not exist.
router.get('/:id', async (request, response) => {
  try {
    const selectedEvent = await Event.findById(
      request.params.id
    );

    if (!selectedEvent) {
      return response.status(404).json({
        message: 'Event not found.'
      });
    }

    return response.status(200).json(selectedEvent);
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({
        message: 'Invalid event ID.'
      });
    }

    return response.status(500).json({
      message: 'Failed to fetch event.'
    });
  }
});

// TODO 3: POST /api/events
// Validate the request body, create an Event document, save it, and return it.
router.post('/', async (request, response) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      venue
    } = request.body;

    if (
      !eventName?.trim() ||
      !eventDescription?.trim() ||
      !eventDate ||
      !venue?.trim()
    ) {
      return response.status(400).json({
        message: 'Please fill in all event fields.'
      });
    }

    const newEvent = await Event.create({
      eventName,
      eventDescription,
      eventDate,
      venue
    });

    return response.status(201).json(newEvent);
  } catch (error) {
    return response.status(500).json({
      message: 'Failed to create event.'
    });
  }
});

// TODO 4: PUT /api/events/:id
// Update the existing event and return the updated document.
router.put('/:id', async (request, response) => {
  try {
    const {
      eventName,
      eventDescription,
      eventDate,
      venue
    } = request.body;

    if (
      !eventName?.trim() ||
      !eventDescription?.trim() ||
      !eventDate ||
      !venue?.trim()
    ) {
      return response.status(400).json({
        message: 'Please fill in all event fields.'
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      request.params.id,
      { eventName, eventDescription, eventDate, venue },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return response.status(404).json({
        message: 'Event not found.'
      });
    }

    return response.status(200).json(updatedEvent);
  } catch (error) {
    return response.status(
      ['CastError', 'ValidationError'].includes(error.name)
        ? 400
        : 500
    ).json({
      message: 'Failed to update event.'
    });
  }
});

// TODO 5: DELETE /api/events/:id
// Delete the event document and send a success response.
router.delete('/:id', async (request, response) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(
      request.params.id
    );

    if (!deletedEvent) {
      return response.status(404).json({
        message: 'Event not found.'
      });
    }

    return response.status(200).json({
      message: 'Event deleted successfully.'
    });
  } catch (error) {
    return response.status(
      error.name === 'CastError' ? 400 : 500
    ).json({
      message: 'Failed to delete event.'
    });
  }
});

export default router;
