var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProfilePage, ItemEditProfilePage } from "../views/view_pages.js";
import User from "../models/user_model.js";
import KeyBinding from "../models/key_binding_model.js";
const getProfilePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profilePage = new ProfilePage();
    //if user is not logged in
    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    const userObject = yield User.findById(req.session.userId);
    const username = userObject === null || userObject === void 0 ? void 0 : userObject.profile.username;
    const email = userObject === null || userObject === void 0 ? void 0 : userObject.profile.email;
    //calculate days
    const registerDate = userObject === null || userObject === void 0 ? void 0 : userObject.profile.createdAt;
    const memberLength = calcMemberLength(registerDate);
    //get number of saves
    const savedBindingCount = yield KeyBinding.countDocuments({ userId: req.session.userId });
    profilePage.setUserStats(username, email, memberLength, savedBindingCount);
    res.render("index", profilePage.getDetails());
});
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
    const itemEditPage = new ItemEditProfilePage();
    res.render("index", itemEditPage);
};
export { getProfilePage, getSavedItemPage };
