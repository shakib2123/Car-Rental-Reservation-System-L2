import { ObjectId } from "mongoose";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = (await Booking.create(payload)).populate("user car");
  return result;
};

const getUsersBooking = async (userId: any) => {
  const result = await Booking.find({ user: userId }).populate("user car");
  return result;
};

export const BookingServices = { createBookingIntoDB, getUsersBooking };
