"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pendingRegistrationSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verificationToken: { type: String, required: true },
    // createdAt field with TTL index: document expires after 300 seconds (5 minutes)
    createdAt: { type: Date, default: Date.now, expires: 300 }
});
exports.default = mongoose_1.default.model("PendingRegistration", pendingRegistrationSchema);
