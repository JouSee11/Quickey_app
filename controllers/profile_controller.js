import { ProfilePage } from "../views/view_pages.js"

const getProfilePage = (req, res) => {
    const profilePage = new ProfilePage()

    profilePage.setUsername(req.session.userId)

    res.render("index", profilePage.getDetails())
}



export {getProfilePage}