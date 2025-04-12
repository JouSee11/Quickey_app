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
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
import User from '../models/user_model.js';
import crypto from 'crypto';
dotenv.config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/sso/google/callback",
}, 
// @ts-ignore
(accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user with the specified email does alreasy exist - login
        let user = yield User.findOne({ email: profile.emails[0].value });
        if (!user) {
            //generate random password - user with sso wont user the password anyway
            const pwdGenerated = crypto.randomBytes(32).toString("hex");
            //check if there is some user with same username but different email - generate username
            let usernameSave = profile.displayName;
            const userSameName = yield User.findOne({ username: usernameSave });
            if (userSameName) {
                const baseName = usernameSave.split(" ")[0];
                const number = crypto.randomInt(1000, 10000);
                usernameSave = `${baseName}_${number}`;
            }
            // Create a new user, adjust values accordingly.
            user = yield User.create({
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
