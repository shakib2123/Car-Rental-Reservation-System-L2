import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),

    carId: z.string({
      required_error: "Car Id is required",
      invalid_type_error: "Car Id must be a string",
    }),
    startTime: z.string({
      required_error: "Start Time is required",
      invalid_type_error: "Start Time must be a string",
    }),
    passport: z.string({
      required_error: "Passport is required",
      invalid_type_error: "Passport must be a string",
    }),
    drivingLicense: z.string({
      required_error: "Driving License is required",
      invalid_type_error: "Driving License must be a string",
    }),
    creditCard: z.string({
      required_error: "Credit Card is required",
      invalid_type_error: "Credit Card must be a string",
    }),
    GPS: z.boolean({
      required_error: "GPS is required",
      invalid_type_error: "GPS must be a boolean",
    }),
    childSeat: z.boolean({
      required_error: "Child Seat is required",
      invalid_type_error: "Child Seat must be a boolean",
    }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
