import {ViewParamsForm} from "../views/view_class.js"

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
    const {username, email, password, passwordConfirm} = req.body

    res.send("you good bro")


    //validate informations
}

export {getRegisterPage, handleRegister}