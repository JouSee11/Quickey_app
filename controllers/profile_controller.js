import { ProfilePage } from "../views/view_pages.js"

const getProfilePage = (req, res) => {
    const profilePage = new ProfilePage()

    profilePage.setUsername(req.session.username)

    res.render("index", profilePage.getDetails())
}



export {getProfilePage}