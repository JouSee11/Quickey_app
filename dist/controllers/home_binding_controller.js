"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBindingPage = void 0;
const view_pages_js_1 = require("../views/view_pages.js");
const user_model_js_1 = __importDefault(require("../models/user_model.js"));
const getBindingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const homePage = new view_pages_js_1.HomeBindingPage();
    //show username if user is logged in
    if (req.session.userId) {
        const userObject = yield user_model_js_1.default.findById(req.session.userId);
        const username = userObject === null || userObject === void 0 ? void 0 : userObject.profile.username;
        homePage.setUsername(username);
    }
    res.render("index", homePage.getDetails());
});
exports.getBindingPage = getBindingPage;
