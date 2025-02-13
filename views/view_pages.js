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
            [
                "home_binding.css",
                "save_binding_dialog.css"
            ],
            [
                "js/home_binding/bind_keys.js",
                "js/home_binding/import_current_data.js",
                "js/home_binding/send_data_to_serial.js",
                "js/home_binding/ui_changes.js",
                "js/home_binding/save_load_binding.js",
                "js/home_binding/save_binding_db.js"
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

class EmailVerifyPage extends ViewParams {
    constructor() {
        super(
            "Verify email",
            ["form_auth.css", "email_verify.css"],
            [
                "/js/verify_email.js",
                "https://cdnjs.cloudflare.com/ajax/libs/validator/13.7.0/validator.min.js"
            ],
            "verify_email",
            true,
            true
        )
        this.email = ""
        this.error = ""
    }

    setEmail(email) {
        this.email = email
    }

    setError(error) {
        this.error = error
    }

    getDetails() {
        const baseDetails = super.getDetails()

        return {...baseDetails, email: this.email, error: this.error}
    }
}






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


class ProfilePage extends ViewParams {
    constructor() {
        super(
            "Profile",
            [
                "profile/profile-main.css",
                "profile/profile-user-info.css",
                "profile/profile-data.css",
                "profile/profile-settings.css",
                "profile/profile-common.css",
                "save_template.css",
                "scrollbar.css"

            ],
            [
                "js/profile/profile_load_saves.js",
            ],
            "profile",
            true,
            true
        )
    }

    setUserStats(username, email, memberLength, savesNum) {
        this.username = username
        this.email = email
        this.memberLength = memberLength
        this.savesNum = savesNum

    }

    getDetails() {
        const baseDetails = super.getDetails()

        return {
            ...baseDetails, 
            username: this.username, 
            email: this.email, 
            memberLength: this.memberLength,
            savesNum: this.savesNum
        }
    }
}


class ItemEditProfilePage extends ViewParams {
    constructor() {
        super(
            "Edit item",
            [
                "profile/profile_item_edit.css",
                "scrollbar.css"
            ],
            [
                "js/item_edit_profile/load_item_binding.js",
            ],
            "profile_item_edit",
            true,
            true
        )
    }

    

    // getDetails() {
    //     const baseDetails = super.getDetails()

    //     return {
    //         ...baseDetails, 
    //         username: this.username, 
    //         email: this.email, 
    //         memberLength: this.memberLength,
    //         savesNum: this.savesNum
    //     }
    // }
}



export {
    RegisterSucPage,
    discoverHomePage,
    HomeBindingPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EmailVerifyPage,
    ItemEditProfilePage
}