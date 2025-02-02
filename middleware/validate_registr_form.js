//register validation
import validator from "validator"
import { ViewParamsForm } from "../views/view_class.js"


const registerFormValidation = (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body
    let errors = []

    // Example validation checks
    if (!username || !email || !password || !passwordConfirm) {
        errors.push({inputField: "general",msg: "All fields are required."})
    }
    if (!usernameUnique(username)) {
        errors.push({inputField: "username",msg: "Username is already taken"});
    }
    if (!usernameValid(username)) {
        errors.push({inputField: "username",msg: "Username length must be 3-20"});
    }
    if (!emailUnique(email)) {
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
        const pageParams = new ViewParamsForm(
            "Register now!",
            ["register.css"],
            [
                "register.js",
            ],
            "register",
            true,
            false,
            errors,
            {username: username, email: email}
        )
        return res.render("index", pageParams.getDetails())
    }

    next() //if there are no errors write the user to the db
}

//username validation
const usernameUnique = (username) => {
    return true
}
const usernameValid = (username) => {
    if (username.length < 3 || username.length > 20) {
        return false
    } else {
        return true
    }
}

//email validation
const emailUnique = (email) => {
    return true
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