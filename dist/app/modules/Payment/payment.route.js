"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_validation_1 = require("./payment.validation");
const router = (0, express_1.Router)();
router.post("/confirmation", payment_controller_1.PaymentController.confirmationController);
router.post("/create-stripe-checkout-session", (0, validateRequest_1.default)(payment_validation_1.PaymentValidations.paymentValidationSchema), payment_controller_1.PaymentController.stripePayment);
router.post("/create-aamarpay-checkout-session", (0, validateRequest_1.default)(payment_validation_1.PaymentValidations.paymentValidationSchema), payment_controller_1.PaymentController.aamarpayPayment);
exports.PaymentRoutes = router;
