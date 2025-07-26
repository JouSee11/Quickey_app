import express from "express"
import { verifyToken } from "../controllers/auth/jwt_controller"
import { saveKeyBinding } from "../controllers/keybinding/save_keybinding_controller"
import { authenticateToken } from "../middleware/auth_middleware"
import {verfiyBindingName} from "../controllers/keybinding/keybinding_user_controller"

const router = express.Router()

router.post("/validate-name", authenticateToken, verfiyBindingName)

router.post("/save", authenticateToken, saveKeyBinding)

export default router