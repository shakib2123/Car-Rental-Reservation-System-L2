"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentModelSchema = new mongoose_1.Schema({
    carId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    bookingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    carName: {
        type: String,
        required: true,
    },
    carImage: {
        type: String,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Payment = (0, mongoose_1.model)("Payment", paymentModelSchema);
