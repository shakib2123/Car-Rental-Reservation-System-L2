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

export const CarServices = { createCarIntoDB, getAllCarFromDB };