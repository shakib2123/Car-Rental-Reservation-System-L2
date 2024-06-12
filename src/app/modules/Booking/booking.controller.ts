import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { AuthError } from "../../errors/authError";
import { User } from "../User/user.model";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { carId, ...bookingData } = req.body;
  bookingData.car = carId;

  const userToken = req.headers.authorization?.split(" ")[1];
  if (!userToken) {
    return AuthError(req, res);
  }

  const decoded = jwt.verify(
    userToken,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const user = await User.findOne({ email: decoded.email });

  const bookingObj = {
    ...bookingData,
    user: user?._id,
  };

  const result = await BookingServices.createBookingIntoDB(bookingObj);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: result,
  });
});

const getUsersBooking = catchAsync(async (req: Request, res: Response) => {
  const userToken = req.headers.authorization?.split(" ")[1];
  if (!userToken) {
    return AuthError(req, res);
  }

  const decoded = jwt.verify(
    userToken,
    config.jwt_access_secret as string
  ) as JwtPayload;

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }

  const result = await BookingServices.getUsersBooking(user?._id);

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
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

export const BookingController = { createBooking, getUsersBooking };
