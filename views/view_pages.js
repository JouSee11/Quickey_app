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
                "home/home_binding.css",
                "home/save_binding_dialog.css",
                "home/custom_context_menu.css",
                "home/multi_select/multi_select_dialog.css",
                "home/multi_select/multi_select_common.css",
                "home/multi_select/multi_select_options.css",
                "home/multi_select/multi_select_action_display.css",
            ],
            [
                "js/home_binding/bind_keys.js",
                "js/home_binding/import_current_data.js",
                "js/home_binding/send_data_to_serial.js",
                "js/home_binding/ui_changes.js",
                "js/home_binding/save_load_binding.js",
                "js/home_binding/save_binding_db.js",
                "js/home_binding/show_context_menu.js",
                "js/home_binding/multi_select/multi_binding.js",
                "js/home_binding/multi_select/multi_binding_ui.js",
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
            ["auth/login.css", "auth/form_auth.css"],
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
            ["auth/register.css", "auth/form_auth.css"],
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
            ["auth/form_auth.css", "auth/email_verify.css"],
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
            ["auth/register_success.css", "auth/form_auth.css"],
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
                "profile/save_template.css",
                "scrollbar.css"

            ],
            [
                "js/profile/profile_load_saves.js",
                "js/profile/search_items.js",
                "js/profile/profile_filter_liked.js",
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
                "profile_item/profile_item_main.css",
                "profile_item/profile_item_toggle.css",
                "profile_item/profile_item_like_button.css",
                "scrollbar.css"
            ],
            [
                "js/item_edit_profile/load_item_binding.js",
                "js/item_edit_profile/delete_item.js",
                "js/item_edit_profile/use_item.js",
                "js/item_edit_profile/edit_item_name_desc.js",
                "js/item_edit_profile/public_priv_switch.js",
                "js/item_edit_profile/item_toggle_like.js",
            ],
            "profile_item_edit",
            true,
            true
        )
    }
}

class NotFoundPage extends ViewParams {
    constructor() {
        super(
            "404 - not found",
            ["not_found.css"],
            [],
            "not_found_404",
            true,
            true
        )
    }
}



export {
    RegisterSucPage,
    discoverHomePage,
    HomeBindingPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    EmailVerifyPage,
    ItemEditProfilePage,
    NotFoundPage
}