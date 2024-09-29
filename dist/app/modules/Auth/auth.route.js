"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidations.userValidationSchema), auth_controller_1.AuthController.register);
router.post("/signin", (0, validateRequest_1.default)(auth_validation_1.AuthValidations.loginUserValidationSchema), auth_controller_1.AuthController.login);
router.post("/forget-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidations.forgetPasswordValidationSchema), auth_controller_1.AuthController.forgetPassword);
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidations.resetPasswordValidationSchema), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
