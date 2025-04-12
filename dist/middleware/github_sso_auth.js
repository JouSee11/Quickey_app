var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from "dotenv";
import User from '../models/user_model.js';
import crypto from 'crypto';
dotenv.config();
passport.use(new GitHubStrategy({
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
        let user = yield User.findOne({ email: email });
        if (!user) {
            // Generate a secure random password
            const pwdGenerated = crypto.randomBytes(32).toString("hex");
            // Use displayName if available, otherwise fall back to username.
            let username = profile.displayName || profile.username;
            //check if there is some user with same username but different email - generate username
            const userSameName = yield User.findOne({ username: username });
            if (userSameName) {
                const baseName = username.split(" ")[0];
                const number = crypto.randomInt(1000, 10000);
                username = `${baseName}_${number}`;
            }
            // Create new user document
            user = yield User.create({
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
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
