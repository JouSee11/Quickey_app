import { ProfilePage, ItemEditProfilePage } from "../views/view_pages.js"
import User from "../models/user_model.js"
import KeyBinding from "../models/key_binding_model.js"
import { CURSOR_FLAGS } from "mongodb"



const getProfilePage = async (req, res) => {
    const profilePage = new ProfilePage()

    //if user is not logged in
    if(!req.session.userId) {
        return res.redirect("/auth/login")
    }

    const userObject = await User.findById(req.session.userId)
    const username = userObject?.profile.username as string
    const email = userObject?.profile.email as string
    //calculate days
    const registerDate = userObject?.profile.createdAt
    const memberLength = calcMemberLength(registerDate) as number

    //get number of saves
    const savedBindingCount = await KeyBinding.countDocuments({userId: req.session.userId})

    profilePage.setUserStats(username, email, memberLength, savedBindingCount)

    res.render("index", profilePage.getDetails())
}

const calcMemberLength = (regDate) => {
    const dateNow = Date.now()
    const timeDiff = dateNow - new Date(regDate).getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff
}

const getSavedItemPage = (req, res) => {
    //if user is not logged in
    if(!req.session.userId) {
        return res.redirect("/auth/login")
    }

    const itemEditPage = new ItemEditProfilePage()

    res.render("index", itemEditPage)
}

export {getProfilePage, getSavedItemPage}
