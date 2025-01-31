import ViewParams from "../views/view_class.js"


const getBindingPage = (req, res) => {
    const pageParams = new ViewParams(
        "Key binding",
        ["home_binding.css"],
        [
            "bind_keys.js",
            "import_current_data.js",
            "send_data_to_serial.js",
            "ui_changes.js",
        ],
        "home_binding",
        true,
        false
    )
    res.render("index", pageParams.getDetails())
}


export {getBindingPage}