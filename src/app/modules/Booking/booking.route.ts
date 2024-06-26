import { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLES } from "../User/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLES.user),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingController.createBooking
);

router.get("/", auth(USER_ROLES.admin), BookingController.getAllBookings);

router.get(
  "/my-bookings",
  auth(USER_ROLES.user),
  BookingController.getUsersBooking
);

export const BookingRoutes = router;
