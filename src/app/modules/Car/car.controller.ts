import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.services";
import httpStatus from "http-status";

const createCar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.createCarIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Car created successfully",
    data: result,
  });
});
const getAllCar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.getAllCarFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

export const CarController = { createCar, getAllCar };
