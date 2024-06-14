"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidations = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        }),
        color: zod_1.z.string({
            required_error: "Color is required",
            invalid_type_error: "Color must be a string",
        }),
        isElectric: zod_1.z.boolean({
            required_error: "isElectric is required",
            invalid_type_error: "isElectric must be a boolean",
        }),
        features: zod_1.z.array(zod_1.z.string()),
        pricePerHour: zod_1.z.number({
            required_error: "PricePerHour is required",
            invalid_type_error: "PricePerHour must be a number",
        }),
    }),
});
const updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
            .optional(),
        color: zod_1.z
            .string({
            required_error: "Color is required",
            invalid_type_error: "Color must be a string",
        })
            .optional(),
        isElectric: zod_1.z
            .boolean({
            required_error: "isElectric is required",
            invalid_type_error: "isElectric must be a boolean",
        })
            .optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        pricePerHour: zod_1.z
            .number({
            required_error: "PricePerHour is required",
            invalid_type_error: "PricePerHour must be a number",
        })
            .optional(),
    }),
});
const returnCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string({
            required_error: "Booking Id is required",
            invalid_type_error: "Booking Id must be a string",
        }),
        endTime: zod_1.z.string({
            required_error: "End Time is required",
            invalid_type_error: "End Time must be a string",
        }),
    }),
});
exports.CarValidations = {
    createCarValidationSchema,
    updateCarValidationSchema,
    returnCarValidationSchema,
};
