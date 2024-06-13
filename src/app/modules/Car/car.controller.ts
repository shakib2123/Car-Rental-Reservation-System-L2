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

  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CarServices.getSingleCarFromDB(id);
  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});
const updateCar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CarServices.updateCarIntoDB(id, req.body);

  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});
const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CarServices.deleteCarIntoDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car Deleted successfully",
    data: result,
  });
});

const returnCar = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const result = await CarServices.returnCarFromDB(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: result,
  });
});

export const CarController = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  deleteCar,
  returnCar,
};
