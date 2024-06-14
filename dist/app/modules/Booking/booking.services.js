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
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("../Car/car.model");
const booking_model_1 = require("./booking.model");
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find(query).populate("user car");
    return result;
});
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarExists = yield car_model_1.Car.findByIdAndUpdate(payload.car, {
        status: "unavailable",
    }, { new: true });
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not found !");
    }
    const result = (yield booking_model_1.Booking.create(payload)).populate("user car");
    return result;
});
const getUsersBooking = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ user: userId }).populate("user car");
    return result;
});
exports.BookingServices = {
    getAllBookings,
    createBookingIntoDB,
    getUsersBooking,
};
