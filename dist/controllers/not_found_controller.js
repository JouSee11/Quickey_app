"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_pages_js_1 = require("../views/view_pages.js");
const showNotFoundPage = (req, res) => {
    const notFoundPage = new view_pages_js_1.NotFoundPage();
    res.render("index", notFoundPage.getDetails());
};
exports.default = showNotFoundPage;
