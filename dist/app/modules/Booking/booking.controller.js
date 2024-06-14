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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const booking_services_1 = require("./booking.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authError_1 = require("../../errors/authError");
const user_model_1 = require("../User/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { carId } = _b, bookingData = __rest(_b, ["carId"]);
    bookingData.car = carId;
    const userToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!userToken) {
        return (0, authError_1.AuthError)(req, res);
    }
    const decoded = jsonwebtoken_1.default.verify(userToken, config_1.default.jwt_access_secret);
    const user = yield user_model_1.User.findOne({ email: decoded.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const bookingObj = Object.assign(Object.assign({}, bookingData), { user: user === null || user === void 0 ? void 0 : user._id });
    const result = yield booking_services_1.BookingServices.createBookingIntoDB(bookingObj);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Car booked successfully",
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId, date } = req.query;
    let queryObj = {};
    if (req.query.carId) {
        queryObj.car = carId;
    }
    if (req.query.date) {
        queryObj.date = date;
    }
    if (req.query.carId && req.query.date) {
        queryObj.car = carId;
        queryObj.date = date;
    }
    const result = yield booking_services_1.BookingServices.getAllBookings(queryObj);
    if (!result || result.length === 0) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const getUsersBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userToken = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
    if (!userToken) {
        return (0, authError_1.AuthError)(req, res);
    }
    const decoded = jsonwebtoken_1.default.verify(userToken, config_1.default.jwt_access_secret);
    const user = yield user_model_1.User.findOne({ email: decoded.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield booking_services_1.BookingServices.getUsersBooking(user === null || user === void 0 ? void 0 : user._id);
    if (!result || result.length === 0) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "My Bookings retrieved successfully",
        data: result,
    });
}));
exports.BookingController = {
    getAllBookings,
    createBooking,
    getUsersBooking,
};
