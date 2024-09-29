import { Types } from "mongoose";

export type TPayment = {
  carId: Types.ObjectId;
  userId: Types.ObjectId;
  userEmail: string;
  bookingId: Types.ObjectId;
  carName: string;
  carImage: string;
  totalCost: number;
  date: string;
  startTime: string;
  endTime: string;
  paymentMethod: string;
  transactionId: string;
};
