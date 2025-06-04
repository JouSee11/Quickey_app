import { AboutPage } from "../views/view_pages.js"

const showAboutPage = async (req, res) => {
    const aboutPage = new AboutPage();
    res.render("index", aboutPage.getDetails())
}

export default showAboutPage