import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
import User from '../models/user_model.js';
import crypto from 'crypto';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Here, implement your user lookup/creation logic. For instance:
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          //generate random password
          const pwdGenerated = crypto.randomBytes(32).toString("hex")

          // Create a new user, adjust values accordingly.
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: pwdGenerated, // Dummy (or handle accordingly),
            registerType: "sso"
          });
        }
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
