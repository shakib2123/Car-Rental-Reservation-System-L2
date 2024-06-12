import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (data: TCar) => {
  const car = await Car.create(data);
  return car;
};

export const CarServices = { createCarIntoDB };
