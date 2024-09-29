"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidations = void 0;
const zod_1 = require("zod");
const paymentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        carId: zod_1.z.string({
            required_error: "Car Id is required",
            invalid_type_error: "Car Id must be a string",
        }),
        userId: zod_1.z.string({
            required_error: "User Id is required",
            invalid_type_error: "User Id must be a string",
        }),
        userEmail: zod_1.z.string({
            required_error: "User Email is required",
            invalid_type_error: "User Email must be a string",
        }),
        bookingId: zod_1.z.string({
            required_error: "Booking Id is required",
            invalid_type_error: "Booking Id must be a string",
        }),
        carName: zod_1.z.string({
            required_error: "Car Name is required",
            invalid_type_error: "Car Name must be a string",
        }),
        carImage: zod_1.z.string({
            required_error: "Car Image is required",
            invalid_type_error: "Car Image must be a string",
        }),
        totalCost: zod_1.z.number({
            required_error: "Total Cost is required",
            invalid_type_error: "Total Cost must be a number",
        }),
        date: zod_1.z.string({
            required_error: "Date is required",
            invalid_type_error: "Date must be a string",
        }),
        startTime: zod_1.z.string({
            required_error: "Start Time is required",
            invalid_type_error: "Start Time must be a string",
        }),
        endTime: zod_1.z.string({
            required_error: "End Time is required",
            invalid_type_error: "End Time must be a string",
        }),
        paymentMethod: zod_1.z.string({
            required_error: "Payment method is required",
            invalid_type_error: "Payment method must be a string",
        }),
    }),
});
exports.PaymentValidations = {
    paymentValidationSchema,
};
