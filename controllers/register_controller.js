import {RegisterPage, RegisterSucPage} from "../views/view_pages.js"
import User from "../models/user_model.js"

const getRegisterPage = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/profile")
    }
    const registerPage = new RegisterPage()
    res.render("index", registerPage.getDetails())
}

const handleRegister =  async (req, res, next) => {
    const {username, email, password} = req.body

    const newUser = new User({
        username: username.trim(),
        email: email.trim(),
        password: password
    })

    await newUser.save()

    res.redirect("/auth/register/success")
}

const getRegisterSucPage = (req, res) => {
    const regSucPage = new RegisterSucPage() 
    res.render("index", regSucPage.getDetails())
}

export {getRegisterPage, handleRegister, getRegisterSucPage}