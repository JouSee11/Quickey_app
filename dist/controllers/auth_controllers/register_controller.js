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
exports.getVerifyPage = exports.getRegisterSucPage = exports.handleRegister = exports.getRegisterPage = void 0;
const view_pages_js_1 = require("../../views/view_pages.js");
const pending_registration_model_js_1 = __importDefault(require("../../models/pending_registration_model.js"));
const user_model_js_1 = __importDefault(require("../../models/user_model.js"));
const getRegisterPage = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/profile");
    }
    const registerPage = new view_pages_js_1.RegisterPage();
    res.render("index", registerPage.getDetails());
};
exports.getRegisterPage = getRegisterPage;
// const handleRegister =  async (req, res, next) => {
//     const {username, email, password} = req.body
//     const newUser = new User({
//         username: username.trim(),
//         email: email.trim(),
//         password: password
//     })
//     await newUser.save()
//     res.redirect("/auth/register/success")
//}
const handleRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const pendingUser = yield pending_registration_model_js_1.default.findOne({ email });
        const newUser = new user_model_js_1.default({
            username: pendingUser === null || pendingUser === void 0 ? void 0 : pendingUser.username.trim(),
            email: pendingUser === null || pendingUser === void 0 ? void 0 : pendingUser.email.trim(),
            password: pendingUser === null || pendingUser === void 0 ? void 0 : pendingUser.password
        });
        yield newUser.save();
        //clear pending data
        // Remove previous pending registrations with the same email.
        yield pending_registration_model_js_1.default.deleteMany({ email });
        delete req.session.registerEmail;
    }
    catch (error) {
        return res.send(error + " - error saving user");
    }
    res.redirect("/auth/register/success");
});
exports.handleRegister = handleRegister;
const getRegisterSucPage = (req, res) => {
    const regSucPage = new view_pages_js_1.RegisterSucPage();
    res.render("index", regSucPage.getDetails());
};
exports.getRegisterSucPage = getRegisterSucPage;
const getVerifyPage = (req, res) => {
    //if user didnt some here thought the registration form
    if (!req.session.registerEmail)
        return res.redirect("/auth/register");
    const email = req.session.registerEmail;
    const emailVerifyPage = new view_pages_js_1.EmailVerifyPage();
    emailVerifyPage.setEmail(email);
    return res.render("index", emailVerifyPage.getDetails());
};
exports.getVerifyPage = getVerifyPage;
