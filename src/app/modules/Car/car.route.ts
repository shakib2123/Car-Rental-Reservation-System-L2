import { Router } from "express";
import { CarController } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidations } from "./car.validation";

import { USER_ROLES } from "../User/user.constant";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth(USER_ROLES.admin),
  validateRequest(CarValidations.createCarValidationSchema),
  CarController.createCar
);

router.get("/", CarController.getAllCar);

export const CarRoutes = router;
