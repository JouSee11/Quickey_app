import User from "../models/user_model.js"
import { LoginPage } from "../views/view_pages.js"

const loginFormValidation = async (req, res, next) => {
    const password = req.body.password
    const username = req.body.username ? req.body.username.trim() : "";
    let error: String | null = null

    if (!username || !password) {
        error = "Please fill both inputs";
    } else {
        const user = await findUser(username)
        if (!user) {
            error = "Invalid credentials";
        } else if (user.profile.registerType === "sso") {
            error = "Email/username logged with external methods (SSO)";
        } else if (!(await loginValid(user, password))) {
            error = "Invalid credentials";
        }
    }
    
    

    if (error) {
        //if there is error stay on the login page with errors
        const loginPage = new LoginPage()
        loginPage.setErrors(error)
        loginPage.setFormData({username: username})
        return res.render("index", loginPage.getDetails())
    }
    req.body.user = await findUser(username)
    next()
}

// const getUserByUsername = async (username) => {
//     const user = await User.findByUsername(username)
//     return user
// }
const findUser = async (username) => {
    const user = await User.findOne({
        $or: [
          { username: username },
          { email: username }
        ]
      });

    return user
}

const loginValid = async (user, password) => {
    // const user = await User.findByUsername(username)
    // //check if the entered username exists
    // if (!user) return false
    
    return await user.comparePassword(password)
}


export default loginFormValidation