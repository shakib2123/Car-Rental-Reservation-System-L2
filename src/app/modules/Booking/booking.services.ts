import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Car } from "../Car/car.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const getAllBookings = async (query: Record<string, unknown>) => {
  const result = await Booking.find(query).populate("user car");
  return result;
};

const createBookingIntoDB = async (payload: TBooking) => {
  const isCarExists = await Car.findByIdAndUpdate(
    payload.car,
    {
      status: "unavailable",
    },
    { new: true }
  );

  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
  }

  const result = (await Booking.create(payload)).populate("user car");
  return result;
};

const getUsersBooking = async (userId: any) => {
  const result = await Booking.find({ user: userId }).populate("user car");
  return result;
};

export const BookingServices = {
  getAllBookings,
  createBookingIntoDB,
  getUsersBooking,
};
