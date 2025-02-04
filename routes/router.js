import express from "express";
import authRouter from "./page_routers/auth_router.js"
import dicoverRouter from "./page_routers/discover_router.js"
import {getBindingPage} from "../controllers/home_binding_controller.js"
import profileRouter from "./page_routers/profile_router.js"
import apiAuthRouter from "./page_routers/api_auth_router.js"

const router = express.Router()

router.route("/")
.get(getBindingPage)

//routes for login
router.use("/auth", authRouter)

//profile router
router.use("/profile", profileRouter)

//routes for discover
router.use("/discover", dicoverRouter)

//routes for api
router.use("/api/auth", apiAuthRouter)




export default router