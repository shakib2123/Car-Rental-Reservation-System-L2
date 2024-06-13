import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    color: z.string({
      required_error: "Color is required",
      invalid_type_error: "Color must be a string",
    }),
    isElectric: z.boolean({
      required_error: "isElectric is required",
      invalid_type_error: "isElectric must be a boolean",
    }),
    features: z.array(z.string()),
    pricePerHour: z.number({
      required_error: "PricePerHour is required",
      invalid_type_error: "PricePerHour must be a number",
    }),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .optional(),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .optional(),
    color: z
      .string({
        required_error: "Color is required",
        invalid_type_error: "Color must be a string",
      })
      .optional(),
    isElectric: z
      .boolean({
        required_error: "isElectric is required",
        invalid_type_error: "isElectric must be a boolean",
      })
      .optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number({
        required_error: "PricePerHour is required",
        invalid_type_error: "PricePerHour must be a number",
      })
      .optional(),
  }),
});

const returnCarValidationSchema = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: "Booking Id is required",
      invalid_type_error: "Booking Id must be a string",
    }),
    endTime: z.string({
      required_error: "End Time is required",
      invalid_type_error: "End Time must be a string",
    }),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
  returnCarValidationSchema,
};
