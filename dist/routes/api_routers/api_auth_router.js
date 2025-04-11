"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_auth_controller_js_1 = require("../../controllers/api_controllers/api_auth_controller.js");
const router = express_1.default.Router();
router.route("/unique-username")
    .post(api_auth_controller_js_1.checkUniqueUsername);
router.route("/unique-email")
    .post(api_auth_controller_js_1.checkUniqueEmail);
exports.default = router;
