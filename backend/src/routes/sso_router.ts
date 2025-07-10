import passport from "passport"
import express from "express"
import "../middleware/sso/google_sso_auth.ts"
import "../middleware/sso/github_sso_auth"

const router = express.Router()

//google
router.get(
    "/google",
    passport.authenticate("google", {scope: ["email", "profile"], prompt: "select_account"})
)
router.get(
    "/google/callback",
    googleCallback
)

//github
router.get(
    "/github",
    passport.authenticate("github", {scope: ["user:email"]})
)
router.get(
    "/github/callback",
    githubCallback
)

export default router