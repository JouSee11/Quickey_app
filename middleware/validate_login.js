import User from "../models/user.js"
import { LoginPage } from "../views/view_pages.js"

const loginFormValidation = async (req, res, next) => {
    const {username, password} = req.body
    let error = null

    if (!username || !password) {
        error = "Please fill both inputs"
    } else if (! (await loginValid(username, password))){
        error = "Invalid credentials"
    }

    if (error) {
        //if there is error stay on the login page with errors
        const loginPage = new LoginPage()
        loginPage.setErrors(error)
        loginPage.setFormData({username: username})
        return res.render("index", loginPage.getDetails())
    }
    req.body.user = await getUserByUsername(username)
    next()
}

const getUserByUsername = async (username) => {
    const user = await User.findByUsername(username)
    return user
}

const loginValid = async (username, password) => {
    const user = await getUserByUsername(username)
    //check if the entered username exists
    if (!user) return false

    return await user.comparePassword(password)
}


export default loginFormValidation