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
exports.getSavedItemPage = exports.getProfilePage = void 0;
const view_pages_js_1 = require("../views/view_pages.js");
const user_model_js_1 = __importDefault(require("../models/user_model.js"));
const key_binding_model_js_1 = __importDefault(require("../models/key_binding_model.js"));
const getProfilePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profilePage = new view_pages_js_1.ProfilePage();
    //if user is not logged in
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    const userObject = yield user_model_js_1.default.findById(req.session.userId);
    const username = userObject === null || userObject === void 0 ? void 0 : userObject.profile.username;
    const email = userObject === null || userObject === void 0 ? void 0 : userObject.profile.email;
    //calculate days
    const registerDate = userObject.profile.createdAt;
    const memberLength = calcMemberLength(registerDate);
    //get number of saves
    const savedBindingCount = yield key_binding_model_js_1.default.countDocuments({ userId: req.session.userId });
    profilePage.setUserStats(username, email, memberLength, savedBindingCount);
    res.render("index", profilePage.getDetails());
});
exports.getProfilePage = getProfilePage;
const calcMemberLength = (regDate) => {
    const dateNow = Date.now();
    const timeDiff = dateNow - new Date(regDate).getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};
const getSavedItemPage = (req, res) => {
    //if user is not logged in
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    const itemEditPage = new view_pages_js_1.ItemEditProfilePage();
    res.render("index", itemEditPage);
};
exports.getSavedItemPage = getSavedItemPage;
