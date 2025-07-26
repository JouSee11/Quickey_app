import express from "express"
import aboutRouter from "./about_router"
import authRouter from './auth_router'
import keybindingRouter from './keybinding_router'

const router = express.Router()

router.use("/api/about", aboutRouter)

router.use("/api/auth", authRouter)

router.use("/api/keybinding", keybindingRouter)

export default router