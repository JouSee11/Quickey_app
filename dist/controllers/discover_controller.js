import { discoverHomePage } from "../views/view_pages.js";
const getDiscoverPage = (req, res) => {
    res.render("index", discoverHomePage.getDetails());
};
export { getDiscoverPage };
