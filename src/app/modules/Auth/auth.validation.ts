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

export const AuthValidations = {
  loginUserValidationSchema,
};
