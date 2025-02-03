import { ViewParams} from "./view_class.js";

const homeBindingPage = new ViewParams(
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

const loginPage = new ViewParams(
    "Login page",
    ["login.css"],
    [
        "login.js",
    ],
    "login",
    true,
    false
)

const registerPage = new ViewParams(
    "Register now!",
    ["register.css"],
    [
        "register.js",
    ],
    "register",
    true,
    false
)

const registerSuccess = new ViewParams(
    "Registration successfull!",
    ["register_success.css"],
    [""],
    "registration_success",
    true,
    false
)

const discoverHomePage = new ViewParams(
    "Discover",
    ["discover_page.css"],
    [
        "discover.js",
    ],
    "discover",
    true,
    true
)

const profilePage = new ViewParams(
    "Profile",
    ["profile_page.css"],
    [
        "profile.js",
    ],
    "profile",
    true,
    false
)


export {homeBindingPage, loginPage, registerPage, registerSuccess, discoverHomePage, profilePage}