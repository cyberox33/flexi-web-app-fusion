import mongoose from "mongoose";
import { BookingType, EventType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  guestCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
});

const eventSchema = new mongoose.Schema<EventType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  guestCount: { type: Number, required: true },
  entryFee: { type: Number, required: true, min:0 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [bookingSchema],
});

const Event = mongoose.model<EventType>("Event", eventSchema);
export default Event;
