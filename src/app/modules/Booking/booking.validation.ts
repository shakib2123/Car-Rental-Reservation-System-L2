import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),
    carId: z.string(),
    startTime: z.string(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
