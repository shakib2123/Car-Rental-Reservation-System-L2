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
exports.CarServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = require("./car.model");
const booking_model_1 = require("../Booking/booking.model");
const convertTimeToHours_1 = require("../../utils/convertTimeToHours");
const mongoose_1 = __importDefault(require("mongoose"));
const createCarIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.create(data);
    return result;
});
const getAllCarFromDB = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.Car.find(filter);
    return result;
});
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarExists = yield car_model_1.Car.findById(id);
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not found !");
    }
    const result = isCarExists;
    return result;
});
const updateCarIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarExists = yield car_model_1.Car.findById(id);
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not found !");
    }
    const result = yield car_model_1.Car.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCarIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarExists = yield car_model_1.Car.findById(id);
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not found !");
    }
    const result = yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const returnCarFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isBookingExists = yield booking_model_1.Booking.findById(payload.bookingId).session(session);
        if (!isBookingExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking is not found !");
        }
        const isCarExists = yield car_model_1.Car.findByIdAndUpdate(isBookingExists.car, {
            status: "available",
        }, {
            new: true,
            session,
        });
        if (!isCarExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not found !");
        }
        const startHours = (0, convertTimeToHours_1.convertTimeToHours)(isBookingExists.startTime);
        const endHours = (0, convertTimeToHours_1.convertTimeToHours)(payload.endTime);
        let durationHours = endHours - startHours;
        // If endTime is less than startTime, it means endTime is on the next day
        if (durationHours < 0) {
            durationHours += 24;
        }
        const totalCost = Number(durationHours) * Number(isCarExists.pricePerHour);
        const updatedBooking = yield booking_model_1.Booking.findByIdAndUpdate(payload.bookingId, {
            endTime: payload.endTime,
            returned: true,
            totalCost,
        }, {
            new: true,
            session,
        }).populate("user car");
        yield session.commitTransaction();
        yield session.endSession();
        return updatedBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Failed to return bookings`);
    }
});
exports.CarServices = {
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarIntoDB,
    returnCarFromDB,
};
