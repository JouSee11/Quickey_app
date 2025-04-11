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
const passport_github2_1 = require("passport-github2");
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_js_1 = __importDefault(require("../models/user_model.js"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/sso/github/callback",
    scope: ['user:email'] // ensure email is returned
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Safely get the email from the profile
        const email = (profile.emails && profile.emails.length > 0)
            ? profile.emails[0].value
            : profile._json.email;
        if (!email) {
            return cb(new Error("No email found from GitHub"), null);
        }
        let user = yield user_model_js_1.default.findOne({ email: email });
        if (!user) {
            // Generate a secure random password
            const pwdGenerated = crypto_1.default.randomBytes(32).toString("hex");
            // Use displayName if available, otherwise fall back to username.
            let username = profile.displayName || profile.username;
            //check if there is some user with same username but different email - generate username
            const userSameName = yield user_model_js_1.default.findOne({ username: username });
            if (userSameName) {
                const baseName = username.split(" ")[0];
                const number = crypto_1.default.randomInt(1000, 10000);
                username = `${baseName}_${number}`;
            }
            // Create new user document
            user = yield user_model_js_1.default.create({
                username: username,
                email: email,
                password: pwdGenerated, // hashed on pre-save
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
