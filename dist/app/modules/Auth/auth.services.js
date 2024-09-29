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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: payload.email,
    });
    if (user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This user is already exist !");
    }
    const result = yield user_model_1.User.create(payload);
    const _a = result.toObject(), { password } = _a, userData = __rest(_a, ["password"]);
    return userData;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: payload.email,
    }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const passwordMatch = yield (0, auth_utils_1.isPasswordMatched)(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatch) {
        throw new Error("Password not matched");
    }
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_secret_expires_in,
    });
    const _a = user.toObject(), { password } = _a, userData = __rest(_a, ["password"]);
    return {
        user: userData,
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // check if the  user is deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const resetToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "10m",
    });
    const resetUILink = `${config_1.default.reset_pass_ui_link}?id=${user._id}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetUILink);
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    const decoded = jsonwebtoken_1.default.verify(payload.token, config_1.default.jwt_access_secret);
    if (payload.id !== decoded.userId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
    }
    // hash password
    const newHashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_round));
    yield user_model_1.User.findOneAndUpdate({
        email: decoded.email,
        role: decoded.role,
    }, {
        password: newHashedPassword,
    });
});
exports.AuthServices = { register, login, forgetPassword, resetPassword };
