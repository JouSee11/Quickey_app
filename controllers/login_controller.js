import ViewParams from "../views/view_class.js"

const getLoginPage = (req, res) => {
    const pageParams = new ViewParams(
        "Login page",
        ["login.css"],
        [
            "login.js",
        ],
        "login",
        true,
        false
    )
    res.render("index", pageParams.getDetails())
}



export {getLoginPage}