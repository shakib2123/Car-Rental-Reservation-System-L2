"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("../User/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(user_constant_1.USER_ROLES.user), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingController.createBooking);
router.get("/", (0, auth_1.auth)(user_constant_1.USER_ROLES.admin), booking_controller_1.BookingController.getAllBookings);
router.get("/my-bookings", (0, auth_1.auth)(user_constant_1.USER_ROLES.user), booking_controller_1.BookingController.getUsersBooking);
exports.BookingRoutes = router;
