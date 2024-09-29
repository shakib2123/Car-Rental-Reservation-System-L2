import httpStatus from "http-status";
import config from "../../config";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import Stripe from "stripe";
import AppError from "../../errors/AppError";
import { Booking } from "../Booking/booking.model";
import { initiatePayment, verifyPayment } from "../../utils/aamarpayPayment";
import { User } from "../User/user.model";
import { join } from "path";
import { readFileSync } from "fs";

const stripe = new Stripe(config.stripe_secret_key!);

const stripePaymentIntoDB = async (data: TPayment) => {
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: data.carName,
          images: [data.carImage],
        },
        unit_amount: Math.round(data.totalCost * 100),
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: config.payment_success_url,
    cancel_url: config.payment_cancel_url,
  });

  if (session.id) {
    await Booking.findOneAndUpdate({ _id: data.bookingId }, { isPaid: true });

    const paymentData = {
      ...data,
      transactionId: session.id,
    };

    await Payment.create(paymentData);
    return { id: session.id };
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment failed");
  }
};
const aamarpayPaymentIntoDB = async (data: TPayment) => {
  const isExistUser = await User.findById(data.userId);

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  await Booking.findOneAndUpdate({ _id: data.bookingId }, { isPaid: true });

  const transactionId = `TNX-${data.userEmail}-${Date.now()}`;

  const paymentData = {
    ...data,
    transactionId,
  };

  // payment
  const paymentSession = await initiatePayment({
    ...paymentData,
    customerName: isExistUser.name,
    customerPhone: isExistUser.phone,
  });

  if (paymentSession.result === "true") {
    await Payment.create(paymentData);
    return paymentSession;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "Payment failed");
  }
};

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = "";

  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    message = "Successfully Paid!";
  } else {
    message = "Payment Failed!";
  }

  const filePath = join(__dirname, "./confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  template = template.replace("{{message}}", message);

  return template;
};

export const PaymentServices = {
  stripePaymentIntoDB,
  aamarpayPaymentIntoDB,
  confirmationService,
};
