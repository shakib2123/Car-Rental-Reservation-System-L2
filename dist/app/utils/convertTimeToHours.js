"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToHours = void 0;
const convertTimeToHours = (time) => {
    const [hours, minutes] = time.split(":");
    return Number(hours) + Number(minutes) / 60;
};
exports.convertTimeToHours = convertTimeToHours;
