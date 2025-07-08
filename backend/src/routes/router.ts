import express from "express"
import aboutRouter from "./about_router"
import authRouter from './auth_router'

const router = express.Router()

router.use("/api/about", aboutRouter)

router.use("/api/auth", authRouter)

export default router