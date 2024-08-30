import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../User/user.validation";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidations.userValidationSchema),
  AuthController.register
);

router.post(
  "/signin",
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthController.login
);

router.post(
  "/forget-password",
  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthController.forgetPassword
);

router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthController.resetPassword
);

export const AuthRoutes = router;
