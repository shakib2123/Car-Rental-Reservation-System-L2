import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CarRoutes } from "../modules/Car/car.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { UserRoutes } from "../modules/User/user.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
