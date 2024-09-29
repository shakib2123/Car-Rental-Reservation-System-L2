"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: "Date is required",
            invalid_type_error: "Date must be a string",
        }),
        carId: zod_1.z.string({
            required_error: "Car Id is required",
            invalid_type_error: "Car Id must be a string",
        }),
        startTime: zod_1.z.string({
            required_error: "Start Time is required",
            invalid_type_error: "Start Time must be a string",
        }),
        passport: zod_1.z.string({
            required_error: "Passport is required",
            invalid_type_error: "Passport must be a string",
        }),
        drivingLicense: zod_1.z.string({
            required_error: "Driving License is required",
            invalid_type_error: "Driving License must be a string",
        }),
        creditCard: zod_1.z.string({
            required_error: "Credit Card is required",
            invalid_type_error: "Credit Card must be a string",
        }),
        GPS: zod_1.z.boolean({
            required_error: "GPS is required",
            invalid_type_error: "GPS must be a boolean",
        }),
        childSeat: zod_1.z.boolean({
            required_error: "Child Seat is required",
            invalid_type_error: "Child Seat must be a boolean",
        }),
    }),
});
exports.BookingValidations = {
    createBookingValidationSchema,
};
