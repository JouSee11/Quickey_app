var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HomeBindingPage } from "../views/view_pages.js";
import User from "../models/user_model.js";
const getBindingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const homePage = new HomeBindingPage();
    //show username if user is logged in
    if (req.session.userId) {
        const userObject = yield User.findById(req.session.userId);
        const username = userObject === null || userObject === void 0 ? void 0 : userObject.profile.username;
        homePage.setUsername(username);
    }
    res.render("index", homePage.getDetails());
});
export { getBindingPage };
