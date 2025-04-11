import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from "dotenv";
import User from '../models/user_model.js';
import crypto from 'crypto';

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://quickey.pro/auth/sso/github/callback",
      scope: ['user:email'] // ensure email is returned
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Safely get the email from the profile
        const email = (profile.emails && profile.emails.length > 0)
          ? profile.emails[0].value
          : profile._json.email;
        
        if (!email) {
          return cb(new Error("No email found from GitHub"), null);
        }
        
        let user = await User.findOne({ email: email });
        if (!user) {
          // Generate a secure random password
          const pwdGenerated = crypto.randomBytes(32).toString("hex");
          
          // Use displayName if available, otherwise fall back to username.
          let username = profile.displayName || profile.username;
          //check if there is some user with same username but different email - generate username
          const userSameName = await User.findOne({ username: username})
          if (userSameName) {
            const baseName = username.split(" ")[0]
            const number = crypto.randomInt(1000, 10000)
            username = `${baseName}_${number}`
          }
          
          // Create new user document
          user = await User.create({
            username: username,
            email: email,
            password: pwdGenerated, // hashed on pre-save
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
