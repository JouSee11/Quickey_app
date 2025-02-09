import express from "express"
import "../../middleware/google_sso_auth.js"
import "../../middleware/github_sso_auth.js"
import googleCallback from "../../controllers/auth_controllers/google_sso_controller.js"
import githubCallback from "../../controllers/auth_controllers/github_sso_controller.js"
import passport from "passport"

const router = express.Router()

// google auth
router.route("/google")
    .get(passport.authenticate("google", {scope: ["email", "profile"]}))

router.route("/google/callback")
    .get(
        passport.authenticate("google", { failureRedirect: "/auth/login" }),
        googleCallback
  );

// github auth
router.route("/github")
    .get(passport.authenticate("github", {scope: ["user:email"]}))

router.route("/github/callback")
    .get(
        passport.authenticate("github", { failureRedirect: "/auth/login" }),
        githubCallback
  );

export default router