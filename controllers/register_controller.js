import {registerPage, registerSuccess} from "../views/view_pages.js"
import User from "../models/user.js"

const getRegisterPage = (req, res) => {
    res.render("index", registerPage.getDetails())
}

const handleRegister =  async (req, res, next) => {
    const {username, email, password} = req.body

    const newUser = new User({
        username: username,
        email: email,
        password: password
    })

    await newUser.save()

    res.redirect("/auth/register/success")
}

const getRegisterSucPage = (req, res) => {
    res.render("index", registerSuccess.getDetails())
}

export {getRegisterPage, handleRegister, getRegisterSucPage}