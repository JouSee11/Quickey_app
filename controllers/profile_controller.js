import { ProfilePage } from "../views/view_pages.js"
import User from "../models/user_model.js"


const getProfilePage = async (req, res) => {
    const profilePage = new ProfilePage()

    //if user is not logged in
    if(!req.session.userId) {
        return res.redirect("/auth/login")
    }

    const userObject = await User.findById(req.session.userId)
    const username = userObject.profile.username

    profilePage.setUsername(username)

    res.render("index", profilePage.getDetails())
}

export {getProfilePage}