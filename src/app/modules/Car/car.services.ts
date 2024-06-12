import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import { Car } from "./car.model";

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

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarIntoDB,
};
