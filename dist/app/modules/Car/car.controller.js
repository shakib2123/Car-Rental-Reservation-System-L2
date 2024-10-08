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
exports.CarController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const car_services_1 = require("./car.services");
const http_status_1 = __importDefault(require("http-status"));
const createCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_services_1.CarServices.createCarIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Car created successfully",
        data: result,
    });
}));
const getAllCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchValue, carType, minPrice, maxPrice } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter = { isDeleted: false };
    if (searchValue) {
        filter.$or = [
            { name: { $regex: searchValue, $options: "i" } },
            { model: { $regex: searchValue, $options: "i" } },
            { location: { $regex: searchValue, $options: "i" } },
            { color: { $regex: searchValue, $options: "i" } },
            { year: { $regex: searchValue } },
            { date: { $regex: searchValue, $options: "i" } },
            { features: { $elemMatch: { $regex: searchValue, $options: "i" } } },
            { description: { $regex: searchValue, $options: "i" } },
        ];
    }
    if (carType) {
        filter.carType = carType;
    }
    if (minPrice && maxPrice) {
        filter.pricePerHour = { $gte: minPrice, $lte: maxPrice };
    }
    else if (minPrice) {
        filter.pricePerHour = { $gte: minPrice };
    }
    else if (maxPrice) {
        filter.pricePerHour = { $lte: maxPrice };
    }
    const result = yield car_services_1.CarServices.getAllCarFromDB(filter);
    if (!result) {
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
        message: "Cars retrieved successfully",
        data: result,
    });
}));
const getSingleCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield car_services_1.CarServices.getSingleCarFromDB(id);
    if (!result) {
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
        message: "A Car retrieved successfully",
        data: result,
    });
}));
const updateCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield car_services_1.CarServices.updateCarIntoDB(id, req.body);
    if (!result) {
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
        message: "Car updated successfully",
        data: result,
    });
}));
const deleteCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield car_services_1.CarServices.deleteCarIntoDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Car Deleted successfully",
        data: result,
    });
}));
const returnCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    const result = yield car_services_1.CarServices.returnCarFromDB(bookingData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Car returned successfully",
        data: result,
    });
}));
exports.CarController = {
    createCar,
    getAllCar,
    getSingleCar,
    updateCar,
    deleteCar,
    returnCar,
};
