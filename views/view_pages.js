import isEmail from "validator/lib/isEmail.js";
import { ViewParams} from "./view_class.js";

// const homeBindingPage = new ViewParams(
//     "Key binding",
//     ["home_binding.css"],
//     [
//         "bind_keys.js",
//         "import_current_data.js",
//         "send_data_to_serial.js",
//         "ui_changes.js",
//     ],
//     "home_binding",
//     true,
//     false
// )

class HomeBindingPage extends ViewParams {
    constructor() {
        super(
            "Key binding",
            ["home_binding.css"],
            [
                "js/home_binding/bind_keys.js",
                "js/home_binding/import_current_data.js",
                "js/home_binding/send_data_to_serial.js",
                "js/home_binding/ui_changes.js",
                "js/home_binding/save_load_binding.js"
            ],
            "home_binding",
            true,
            true
        )
        this.username = null
    }

    setUsername(data) {
        this.username = data
    }

    getDetails() {
        const baseDetails = super.getDetails()

        return {...baseDetails, username: this.username}
    }
}

// const loginPage = new ViewParams(
//     "Login page",
//     ["login.css"],
//     [
//         "login.js",
//     ],
//     "login",
//     true,
//     false
// )

class LoginPage extends ViewParams {
    constructor() {
        super(
            "Login page",
            ["login.css", "form_auth.css"],
            [
                "js/login.js",
            ],
            "login",
            true,
            true
        )
        this.errors = null
        this.formData = null
    }

    setErrors(error) {
        this.errors = error
    }

    setFormData(formData) {
        this.formData = formData
    }

    getDetails() {
        const baseDetails = super.getDetails()

        return {...baseDetails, error: this.errors, formData: this.formData}
    }
}

// const registerPage = new ViewParams(
//     "Register now!",
//     ["register.css"],
//     [
//         "register.js",
//     ],
//     "register",
//     true,
//     false
// )

class RegisterPage extends ViewParams {
    constructor() {
        super(
            "Register now!",
            ["register.css", "form_auth.css"],
            [
                "js/register.js",
                "https://cdnjs.cloudflare.com/ajax/libs/validator/13.7.0/validator.min.js"
            ],
            "register",
            true,
            true
        )
        this.errors = []
        this.formData = {username: "", email: ""}
    }

    setErrors(error) {
        this.errors = error
    }

    setFormData(formData) {
        this.formData = formData
    }

    getDetails() {
        const baseDetails = super.getDetails()

        return {...baseDetails, errors: this.errors, formData: this.formData}
    }
}




// const registerSuccess = new ViewParams(
//     "Registration successfull!",
//     ["register_success.css"],
//     [""],
//     "registration_success",
//     true,
//     false
// )

class RegisterSucPage extends ViewParams {
    constructor() {
        super(
            "Registration successfull!",
            ["register_success.css", "form_auth.css"],
            [""],
            "registration_success",
            true,
            false
        )
    }
}

const discoverHomePage = new ViewParams(
    "Discover",
    ["discover_page.css"],
    [
        "js/discover.js",
    ],
    "discover",
    true,
    false
)

// const profilePage = new ViewParams(
//     "Profile",
//     ["profile_page.css"],
//     [
//         "profile.js",
//     ],
//     "profile",
//     true,
//     false
// )

class ProfilePage extends ViewParams {
    constructor() {
        super(
            "Profile",
            ["profile_page.css"],
            [
                "js/profile.js",
            ],
            "profile",
            true,
            true
        )
        this.username = null
    }

    setUsername(data) {
        this.username = data
    }

    getDetails() {
        const baseDetails = super.getDetails()

        return {...baseDetails, username: this.username}
    }
}



export {RegisterSucPage, discoverHomePage, HomeBindingPage, LoginPage, RegisterPage, ProfilePage}