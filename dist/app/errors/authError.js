"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AuthError = (req, res) => {
    res.status(401).json({
        success: false,
        statusCode: http_status_1.default.UNAUTHORIZED,
        message: "You have no access to this route",
    });
};
exports.AuthError = AuthError;
