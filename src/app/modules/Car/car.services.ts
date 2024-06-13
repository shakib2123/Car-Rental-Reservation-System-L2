import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar, TReturnCar } from "./car.interface";
import { Car } from "./car.model";
import { Booking } from "../Booking/booking.model";
import { convertToHours } from "../../utils/convertToHours";

const createCarIntoDB = async (data: TCar) => {
  const result = await Car.create(data);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();

  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
  }
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteCarIntoDB = async (id: string) => {
  const isCarExists = await Car.findById(id);
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
  }
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const returnCarFromDB = async (payload: TReturnCar) => {
  const isBookingExists = await Booking.findById(payload.bookingId);
  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking is not found !");
  }

  const isCarExists = await Car.findByIdAndUpdate(
    isBookingExists.car,
    {
      status: "available",
    },
    {
      new: true,
    }
  );
  if (!isCarExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not found !");
  }

  const startHours = convertToHours(isBookingExists.startTime);
  const endHours = convertToHours(payload.endTime);

  let durationHours = endHours - startHours;

  // If endTime is less than startTime, it means endTime is on the next day
  if (durationHours < 0) {
    durationHours += 24;
  }

  const totalCost = Number(durationHours) * Number(isCarExists.pricePerHour);

  const updatedBooking = await Booking.findByIdAndUpdate(
    payload.bookingId,
    {
      endTime: payload.endTime,
      totalCost,
    },
    {
      new: true,
    }
  ).populate("user car");

  return updatedBooking;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarIntoDB,
  returnCarFromDB,
};
