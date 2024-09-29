"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const payment_model_1 = require("./payment.model");
const stripe_1 = __importDefault(require("stripe"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("../Booking/booking.model");
const aamarpayPayment_1 = require("../../utils/aamarpayPayment");
const user_model_1 = require("../User/user.model");
const path_1 = require("path");
const fs_1 = require("fs");
const stripe = new stripe_1.default(config_1.default.stripe_secret_key);
const stripePaymentIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const lineItems = [
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: data.carName,
                    images: [data.carImage],
                },
                unit_amount: Math.round(data.totalCost * 100),
            },
            quantity: 1,
        },
    ];
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: config_1.default.payment_success_url,
        cancel_url: config_1.default.payment_cancel_url,
    });
    if (session.id) {
        yield booking_model_1.Booking.findOneAndUpdate({ _id: data.bookingId }, { isPaid: true });
        const paymentData = Object.assign(Object.assign({}, data), { transactionId: session.id });
        yield payment_model_1.Payment.create(paymentData);
        return { id: session.id };
    }
    else {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Payment failed");
    }
});
const aamarpayPaymentIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.User.findById(data.userId);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    yield booking_model_1.Booking.findOneAndUpdate({ _id: data.bookingId }, { isPaid: true });
    const transactionId = `TNX-${data.userEmail}-${Date.now()}`;
    const paymentData = Object.assign(Object.assign({}, data), { transactionId });
    // payment
    const paymentSession = yield (0, aamarpayPayment_1.initiatePayment)(Object.assign(Object.assign({}, paymentData), { customerName: isExistUser.name, customerPhone: isExistUser.phone }));
    if (paymentSession.result === "true") {
        yield payment_model_1.Payment.create(paymentData);
        return paymentSession;
    }
    else {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Payment failed");
    }
});
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, aamarpayPayment_1.verifyPayment)(transactionId);
    let message = "";
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        message = "Successfully Paid!";
    }
    else {
        message = "Payment Failed!";
    }
    const filePath = (0, path_1.join)(__dirname, "./confirmation.html");
    let template = (0, fs_1.readFileSync)(filePath, "utf-8");
    template = template.replace("{{message}}", message);
    return template;
});
exports.PaymentServices = {
    stripePaymentIntoDB,
    aamarpayPaymentIntoDB,
    confirmationService,
};
