import { z } from "zod";

const paymentValidationSchema = z.object({
  body: z.object({
    carId: z.string({
      required_error: "Car Id is required",
      invalid_type_error: "Car Id must be a string",
    }),
    userId: z.string({
      required_error: "User Id is required",
      invalid_type_error: "User Id must be a string",
    }),
    userEmail: z.string({
      required_error: "User Email is required",
      invalid_type_error: "User Email must be a string",
    }),
    bookingId: z.string({
      required_error: "Booking Id is required",
      invalid_type_error: "Booking Id must be a string",
    }),
    carName: z.string({
      required_error: "Car Name is required",
      invalid_type_error: "Car Name must be a string",
    }),
    carImage: z.string({
      required_error: "Car Image is required",
      invalid_type_error: "Car Image must be a string",
    }),
    totalCost: z.number({
      required_error: "Total Cost is required",
      invalid_type_error: "Total Cost must be a number",
    }),
    date: z.string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),
    startTime: z.string({
      required_error: "Start Time is required",
      invalid_type_error: "Start Time must be a string",
    }),
    endTime: z.string({
      required_error: "End Time is required",
      invalid_type_error: "End Time must be a string",
    }),
    paymentMethod: z.string({
      required_error: "Payment method is required",
      invalid_type_error: "Payment method must be a string",
    }),
  }),
});

export const PaymentValidations = {
  paymentValidationSchema,
};
