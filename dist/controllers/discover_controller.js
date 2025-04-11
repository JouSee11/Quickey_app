"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscoverPage = void 0;
const view_pages_js_1 = require("../views/view_pages.js");
const getDiscoverPage = (req, res) => {
    res.render("index", view_pages_js_1.discoverHomePage.getDetails());
};
exports.getDiscoverPage = getDiscoverPage;
