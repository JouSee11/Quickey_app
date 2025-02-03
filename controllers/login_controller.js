import {loginPage, profilePage} from "../views/view_pages.js"

const getLoginPage = (req, res) => {
    res.render("index", loginPage.getDetails())
}

const handleLogin = (req, res) => {
    // save user data to session
    req.session.username = req.body.user.profile.username

    const profilePageCopy = Object.create(profilePage)

    profilePageCopy.insertData(req.session.username)

    res.render("index", profilePageCopy.getDetails())
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        } else {
            res.render("index", loginPage.getDetails())
        }
    })
}

export {getLoginPage, handleLogin, logoutUser}