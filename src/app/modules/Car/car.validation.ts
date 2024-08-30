import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    model: z.string({
      required_error: "Model is required",
      invalid_type_error: "Model must be a string",
    }),
    year: z.string({
      required_error: "Year is required",
      invalid_type_error: "Year must be a string",
    }),
    date: z.string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    }),
    image: z.string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a string",
    }),
    location: z.string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    }),
    ownerEmail: z.string({
      required_error: "Owner Email is required",
      invalid_type_error: "Owner Email must be a string",
    }),
    ownerName: z.string({
      required_error: "Owner Name is required",
      invalid_type_error: "Owner Name must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    color: z.string({
      required_error: "Color is required",
      invalid_type_error: "Color must be a string",
    }),
    carType: z.string({
      required_error: "Car Type is required",
      invalid_type_error: "Car Type must be a string",
    }),
    seatCapacity: z.number({
      required_error: "Seat Capacity is required",
      invalid_type_error: "Seat Capacity must be a number",
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
    model: z
      .string({
        required_error: "Model is required",
        invalid_type_error: "Model must be a string",
      })
      .optional(),
    Date: z
      .string({
        required_error: "Year is required",
        invalid_type_error: "Year must be a string",
      })
      .optional(),
    image: z
      .string({
        required_error: "Image is required",
        invalid_type_error: "Image must be a string",
      })
      .optional(),
    location: z
      .string({
        required_error: "Location is required",
        invalid_type_error: "Location must be a string",
      })
      .optional(),
    ownerEmail: z
      .string({
        required_error: "Owner Email is required",
        invalid_type_error: "Owner Email must be a string",
      })
      .optional(),
    ownerName: z
      .string({
        required_error: "Owner Name is required",
        invalid_type_error: "Owner Name must be a string",
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
    features: z.array(z.string()),
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
