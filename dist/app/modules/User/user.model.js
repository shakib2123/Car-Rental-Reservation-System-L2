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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
//pre save middleware / hook
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //hashing password and save in database
        this.password = yield bcryptjs_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
//remove password string after saving data
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
