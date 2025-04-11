"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const keyBindingSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must assign the binding to some user"]
    },
    name: {
        type: String,
        required: true,
        minlength: [1, "Must provide name"],
        maxlength: [50, "Max key binding save name is 50 chars"]
    },
    keyBinding: [
        {
            keyIndex: Number,
            keyValues: [String]
        }
    ],
    description: {
        type: String,
        required: false,
        default: null,
        maxlength: [2000, "Description cannot exceed 2000 characters"]
    },
    likes: {
        type: Number,
        required: [true, "The number of likes must be initialized"],
        default: 0
    },
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
// Create a compound index on userId and name to ensure uniqueness per user
keyBindingSchema.index({ userId: 1, name: 1 }, { unique: true });
const KeyBinding = mongoose_1.default.model("keyBinding", keyBindingSchema);
exports.default = KeyBinding;
