"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, "Minimun name length is 3 chars"],
        maxlength: [20, "Maximum name length is 3 chars"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Prevents duplicate email entries
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, "Role error, not set role"],
        default: "user"
    },
    registerType: {
        type: String,
        required: true,
        default: "local"
    },
    profilePicture: {
        type: String,
        default: null,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Pre-save hook to hash the password before saving if it is modified
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            // const salt = await bcrypt.genSalt(10);
            this.password = yield bcrypt_1.default.hash(this.password, 10);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// Instance method to compare candidate password with the user's hashed password
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(candidatePassword, this.password);
    });
};
//find user by username
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};
//find user by email
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
//find user by id - this is buiild in function
// userSchema.statics.findById = function (id) {
//     return this.findOne({ id })
// }
// Virtual property to return a simplified user profile
userSchema.virtual('profile').get(function () {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        registerType: this.registerType,
        profilePicture: this.profilePicture,
        createdAt: this.createdAt
    };
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
