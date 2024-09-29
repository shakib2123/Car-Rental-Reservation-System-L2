import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Car } from "../Car/car.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Schema } from "mongoose";

const getAllBookings = async (query: Record<string, unknown>) => {
  const result = await Booking.find(query).populate("user car");
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id).populate("user car");
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

const getUsersBooking = async (userId: string) => {
  const result = await Booking.find({ user: userId }).populate("user car");
  return result;
};

const handleBookingStatusIntoDB = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const updateBookingIntoDB = async (id: string, payload: TBooking) => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const cancelBookingIntoDB = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const car = await Car.findById(booking.car);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  car.status = "available";
  await car.save();

  const result = await Booking.findByIdAndUpdate(
    id,
    {
      status: "cancel",
    },
    { new: true }
  );
  return result;
};

export const BookingServices = {
  getAllBookings,
  createBookingIntoDB,
  getSingleBookingFromDB,
  getUsersBooking,
  handleBookingStatusIntoDB,
  updateBookingIntoDB,
  cancelBookingIntoDB,
};
