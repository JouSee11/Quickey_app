import {loginPage} from "../views/view_pages.js"

const getLoginPage = (req, res) => {
    res.render("index", loginPage.getDetails())
}

const handleLogin = (req, res) => {
    res.send(`Welcome ${req.body.username}`)
}

export {getLoginPage, handleLogin}