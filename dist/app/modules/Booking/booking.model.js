"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    GPS: {
        type: Boolean,
        required: true,
    },
    childSeat: {
        type: Boolean,
        required: true,
    },
    creditCard: {
        type: String,
        required: true,
    },
    drivingLicense: {
        type: String,
        required: true,
    },
    passport: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        default: null,
    },
    totalCost: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "pending",
    },
    returned: {
        type: Boolean,
        default: false,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
