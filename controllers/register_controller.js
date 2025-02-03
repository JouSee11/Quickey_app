import {ViewParamsForm} from "../views/view_class.js"
import User from "../models/user.js"

const getRegisterPage = (req, res) => {
    const pageParams = new ViewParamsForm(
        "Register now!",
        ["register.css"],
        [
            "register.js",
        ],
        "register",
        true,
        false,
        [],
        {username: "", email: ""}
    )
    res.render("index", pageParams.getDetails())
}

const handleRegister =  async (req, res, next) => {
    const {username, email, password} = req.body

    const newUser = new User({
        username: username,
        email: email,
        password: password
    })

    await newUser.save()

    res.send(`User ${username} was successfully registered, with email ${email}`)
}

export {getRegisterPage, handleRegister}