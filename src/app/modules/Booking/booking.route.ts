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
router.get("/:id", auth(USER_ROLES.user), BookingController.getSingleBooking);

router.patch(
  "/:id",
  auth(USER_ROLES.admin),
  BookingController.handleBookingStatus
);

router.put(
  "/update-booking/:id",
  auth(USER_ROLES.user),
  BookingController.updateBooking
);
router.put(
  "/cancel-booking/:id",
  auth(USER_ROLES.user),
  BookingController.cancelBooking
);

export const BookingRoutes = router;
