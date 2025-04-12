import express from "express";
import authRouter from "./page_routers/auth_router.js"
import dicoverRouter from "./page_routers/discover_router.js"
import {getBindingPage} from "../controllers/home_binding_controller.js"
import profileRouter from "./page_routers/profile_router.js"
import apiAuthRouter from "./api_routers/api_auth_router.js"
import apiSessionRouter from "./api_routers/api_session_router.js"
import apiBindingRouter from "./api_routers/api_key_binding_router.js"
import apiProfileRouter from "./api_routers/api_profile_router.js"
import showNotFoundPage from "../controllers/not_found_controller.js"
import showAboutPage from "../controllers/about_controller.js";

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

//routes for session
router.use("/api/session", apiSessionRouter)

//routes for key bindings
router.use("/api/key-binding", apiBindingRouter)

//routes for profile api
router.use("/api/profile", apiProfileRouter)

router.use("/about", showAboutPage)


// 404 error for all unused routes
router.use(showNotFoundPage)


export default router