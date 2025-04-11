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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_js_1 = __importDefault(require("../models/user_model.js"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/sso/google/callback",
}, 
// @ts-ignore
(accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user with the specified email does alreasy exist - login
        let user = yield user_model_js_1.default.findOne({ email: profile.emails[0].value });
        if (!user) {
            //generate random password - user with sso wont user the password anyway
            const pwdGenerated = crypto_1.default.randomBytes(32).toString("hex");
            //check if there is some user with same username but different email - generate username
            let usernameSave = profile.displayName;
            const userSameName = yield user_model_js_1.default.findOne({ username: usernameSave });
            if (userSameName) {
                const baseName = usernameSave.split(" ")[0];
                const number = crypto_1.default.randomInt(1000, 10000);
                usernameSave = `${baseName}_${number}`;
            }
            // Create a new user, adjust values accordingly.
            user = yield user_model_js_1.default.create({
                username: usernameSave,
                email: profile.emails[0].value,
                password: pwdGenerated, // Dummy (or handle accordingly),
                registerType: "sso"
            });
        }
        return cb(null, user);
    }
    catch (error) {
        return cb(error);
    }
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_js_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
