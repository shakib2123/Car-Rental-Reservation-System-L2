import { Router } from "express";
import { PaymentController } from "./payment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentValidations } from "./payment.validation";

const router = Router();

router.post("/confirmation", PaymentController.confirmationController);

router.post(
  "/create-stripe-checkout-session",
  validateRequest(PaymentValidations.paymentValidationSchema),
  PaymentController.stripePayment
);
router.post(
  "/create-aamarpay-checkout-session",
  validateRequest(PaymentValidations.paymentValidationSchema),
  PaymentController.aamarpayPayment
);

export const PaymentRoutes = router;
