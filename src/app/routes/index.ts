import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CarRoutes } from "../modules/Car/car.route";
import { BookingRoutes } from "../modules/Booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
