var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user_model.js";
import { LoginPage } from "../views/view_pages.js";
const loginFormValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const username = req.body.username ? req.body.username.trim() : "";
    let error = null;
    if (!username || !password) {
        error = "Please fill both inputs";
    }
    else {
        const user = yield findUser(username);
        if (!user) {
            error = "Invalid credentials";
        }
        else if (user.profile.registerType === "sso") {
            error = "Email/username logged with external methods (SSO)";
        }
        else if (!(yield loginValid(user, password))) {
            error = "Invalid credentials";
        }
    }
    if (error) {
        //if there is error stay on the login page with errors
        const loginPage = new LoginPage();
        loginPage.setErrors(error);
        loginPage.setFormData({ username: username });
        return res.render("index", loginPage.getDetails());
    }
    req.body.user = yield findUser(username);
    next();
});
// const getUserByUsername = async (username) => {
//     const user = await User.findByUsername(username)
//     return user
// }
const findUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        $or: [
            { username: username },
            { email: username }
        ]
    });
    return user;
});
const loginValid = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await User.findByUsername(username)
    // //check if the entered username exists
    // if (!user) return false
    return yield user.comparePassword(password);
});
export default loginFormValidation;
