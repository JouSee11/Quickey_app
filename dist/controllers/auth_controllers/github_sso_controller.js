"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const githubCallback = (req, res) => {
    // Successful authentication, assign session userId and redirect.
    req.session.userId = req.user._id;
    delete req.session.passport;
    res.redirect("/profile");
};
exports.default = githubCallback;
