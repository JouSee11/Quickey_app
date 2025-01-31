import express from "express";
import authRouter from "./page_routers/auth_router.js"
import dicoverRouter from "./page_routers/discover_router.js"
import {
    getBindingPage
} from "../controllers/home_binding_controller.js"

const router = express.Router()

router.route("/")
.get(getBindingPage)

//routes for login
router.use("/auth", authRouter)

//routes for discover
router.use("/discover", dicoverRouter)




export default router