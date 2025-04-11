"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.handleLogin = exports.getLoginPage = void 0;
const view_pages_js_1 = require("../../views/view_pages.js");
const getLoginPage = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/profile");
    }
    const loginPage = new view_pages_js_1.LoginPage();
    res.render("index", loginPage.getDetails());
};
exports.getLoginPage = getLoginPage;
const handleLogin = (req, res) => {
    // save user data to session
    req.session.userId = req.body.user.profile.id;
    res.redirect("/profile");
};
exports.handleLogin = handleLogin;
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        else {
            res.redirect("/auth/login");
        }
    });
};
exports.logoutUser = logoutUser;
