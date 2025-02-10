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
      callbackURL: "http://localhost:3000/auth/sso/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // check if user with the specified email does alreasy exist - login
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          //generate random password - user with sso wont user the password anyway
          const pwdGenerated = crypto.randomBytes(32).toString("hex")

          //check if there is some user with same username but different email - generate username
          let usernameSave = profile.displayName
          const userSameName = await User.findOne({ username: usernameSave})
          if (userSameName) {
            const baseName = usernameSave.split(" ")[0]
            const number = crypto.randomInt(1000, 10000)
            usernameSave = `${baseName}_${number}`
          }

          // Create a new user, adjust values accordingly.
          user = await User.create({
            username: usernameSave,
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
