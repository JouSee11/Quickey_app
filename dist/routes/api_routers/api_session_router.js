"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_session_controller_js_1 = require("../../controllers/api_controllers/api_session_controller.js");
const router = express_1.default.Router();
router.route("/save-binding")
    .post(api_session_controller_js_1.sessionSaveBinding);
router.route("/get-binding")
    .get(api_session_controller_js_1.sessionGetBinding);
exports.default = router;
