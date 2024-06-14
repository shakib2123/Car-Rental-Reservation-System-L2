"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        role: zod_1.z.enum(["user", "admin"]),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
        phone: zod_1.z.string({
            required_error: "Phone is required",
            invalid_type_error: "Phone must be a string",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
            invalid_type_error: "Address must be a string",
        }),
    }),
});
exports.UserValidations = {
    userValidationSchema,
};
