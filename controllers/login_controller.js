import {loginPage} from "../views/view_pages.js"

const getLoginPage = (req, res) => {
    res.render("index", loginPage.getDetails())
}

const handleLogin = (req, res) => {
    req.session.username = req.body.user.profile.username

    res.send(`Welcome ${req.session.username}`)
}

export {getLoginPage, handleLogin}