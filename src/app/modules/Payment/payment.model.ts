import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentModelSchema = new Schema<TPayment>(
  {
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    carImage: {
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<TPayment>("Payment", paymentModelSchema);
