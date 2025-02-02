import ViewParams from "../views/view_class.js"
import validator from "validator"


const getRegisterPage = (req, res) => {
    const pageParams = new ViewParams(
        "Register now!",
        ["register.css"],
        [
            "register.js",
        ],
        "register",
        true,
        false
    )
    res.render("index", pageParams.getDetails())
}

const handleRegister =  async (req, res, next) => {
    const {username, email, password, passwordConfirm} = req.body

    if (!username || !email || !password || !passwordConfirm) {
        const msg = "Provide all field"
        res.status(400).redirect("/auth/register")
    } else if (passwordMatch(password, passwordConfirm) & passwordValid(password)) {
        const valid = true
        res.status(201).json({success: valid, data: req.body})
    } else {
        const valid = false
        res.status(400).json({success: valid, data: req.body})
    }


    //validate informations
}

//register validation


//username validation
const usernameUnique = (username) => {
    return true
}
const usernameValid = (username) => {
    if (username.length < 3 || password.length > 20) {
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

export {getRegisterPage, handleRegister}