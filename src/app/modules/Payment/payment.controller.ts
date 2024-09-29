import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.services";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId, status } = req.query;

  const result = await PaymentServices.confirmationService(
    transactionId as string,
    status as string
  );
  res.send(result);
};

const stripePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.stripePaymentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment completed successfully",
    data: result,
  });
});
const aamarpayPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.aamarpayPaymentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment completed successfully",
    data: result,
  });
});

export const PaymentController = {
  stripePayment,
  aamarpayPayment,
  confirmationController,
};
