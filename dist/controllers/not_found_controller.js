import { NotFoundPage } from "../views/view_pages.js";
const showNotFoundPage = (req, res) => {
    const notFoundPage = new NotFoundPage();
    res.render("index", notFoundPage.getDetails());
};
export default showNotFoundPage;
