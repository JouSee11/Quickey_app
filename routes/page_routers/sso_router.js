import express from "express"
import "../../middleware/google_sso_auth.js"
import googleCallback from "../../controllers/auth_controllers/google_sso_controller.js"
import passport from "passport"

const router = express.Router()

router.route("/google")
    .get(passport.authenticate("google", {scope: ["email", "profile"]}))

router.route("/google/callback")
    .get(
        passport.authenticate("google", { failureRedirect: "/auth/login" }),
        googleCallback
  );


export default router