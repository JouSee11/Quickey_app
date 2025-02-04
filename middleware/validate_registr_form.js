//register validation
import validator from "validator"
import { RegisterPage } from "../views/view_pages.js"
import User from "../models/user.js"

const registerFormValidation = async (req, res, next) => {
    let { username, email, password, passwordConfirm } = req.body
    let errors = []
    //trim the spaces for username and email
    username = username.trim() 
    email = email.trim()

    // // Example validation checks
    // if (!username || !email || !password || !passwordConfirm) {
    //     errors.push({inputField: "general",msg: "All fields are required."})
    // }
    if (!(await usernameUnique(username))) {
        errors.push({inputField: "username",msg: "Username is already taken"});
    }
    if (!usernameValid(username)) {
        errors.push({inputField: "username",msg: "Username length must be 3-20"});
    }
    if (!(await emailUnique(email))) {
        errors.push({inputField: "email", msg: "Email is already taken"});
    }
    if (!emailValid(email)) {
        errors.push({inputField: "email", msg: "Email is not valid"});
    }
    if (!passwordValid(password)) {
        errors.push({inputField: "password", msg: "Password requirements: - [A-Z], [0-1], length 8-256."});
    }
    if (!passwordMatch(password, passwordConfirm)) {
        errors.push({inputField: "password-conf", msg: "Passwords do not match"});
    }

    if (errors.length > 0) {
        // Render the form again with error messages and prefilled values
        const registerPage = new RegisterPage()
        registerPage.setErrors(errors)
        registerPage.setFormData({username: username, email: email})
        return res.render("index", registerPage.getDetails())
    }

    next() //if there are no errors write the user to the db
}

//username validation
const usernameUnique = async (username) => {
    const user = await User.findByUsername(username)
    return !user;
}
const usernameValid = (username) => {
    if (username.length < 3 || username.length > 20) {
        return false
    } else {
        return true
    }
}

//email validation
const emailUnique = async (email) => {
    const user = await User.findByEmail(email)
    return !user
}

const emailValid = (email) => {
    return validator.isEmail(email)
}

const passwordMatch = (password, passwordConfirm) => {
    return password === passwordConfirm
}

const passwordValid = (password) => {
    if (password.length < 8 || password.length > 256) {
        return false
    }

    const hasUppercase = /[A-Z]/.test(password);  // Checks for at least one uppercase letter
    const hasNumber = /\d/.test(password);        // Checks for at least one digit
    if (!hasNumber || !hasUppercase) {
        return false
    }
    return true
}


export default registerFormValidation