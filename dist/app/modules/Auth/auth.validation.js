"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }),
    }),
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "User email is required",
        }),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "User email is required",
        }),
        id: zod_1.z.string({
            required_error: "ID is required",
        }),
        token: zod_1.z.string({
            required_error: "Token is required",
        }),
        newPassword: zod_1.z.string({
            required_error: "User password is required",
        }),
    }),
});
exports.AuthValidations = {
    loginUserValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
