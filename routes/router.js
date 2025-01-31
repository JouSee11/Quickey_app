import express from "express";
import {
    getBindingPage
} from "../controllers/home_binding_controller.js"

const router = express.Router()

router.route("/")
.get(getBindingPage)




export default router