import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = (await Booking.create(payload)).populate("user car");
  return result;
};

export const BookingServices = { createBookingIntoDB };
