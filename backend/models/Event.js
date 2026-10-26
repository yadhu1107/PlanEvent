import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true, trim: true },
  eventDescription: { type: String, required: true, trim: true },
  eventDate: { type: Date, required: true },
  venue: { type: String, required: true, trim: true },
  totalRegistrations: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
