import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "../User/user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidations.userValidationSchema),
  AuthController.register
);

export const AuthRoutes = router;
