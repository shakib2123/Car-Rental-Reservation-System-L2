import { z } from "zod";

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "User email is required",
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "User email is required",
    }),
    id: z.string({
      required_error: "ID is required",
    }),
    token: z.string({
      required_error: "Token is required",
    }),
    newPassword: z.string({
      required_error: "User password is required",
    }),
  }),
});

export const AuthValidations = {
  loginUserValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
