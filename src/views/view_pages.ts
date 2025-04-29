import isEmail from "validator/lib/isEmail.js";
import { ViewParams} from "./view_class.js";
import { UnorderedBulkOperation } from "mongodb";

class HomeBindingPage extends ViewParams {
    username = null;

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
                "home/multi_select/multi_select_switch_animation.css",
                "not_supported/not_supported_main.css",
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
                "js/home_binding/multi_select/multi_binding_save_load.js",
                "js/home_binding/multi_select/multi_binding_reorder.js",
                "js/home_binding/page_selection_binding.js",
                "js/small_screen.js"
            ],
            "home_binding",
            true,
            true
        )
        // this.username = null
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
    errors = null;
    formData = null;

    constructor() {
        super(
            "Login page",
            [
                "auth/login.css", 
                "auth/form_auth.css",
                "not_supported/not_supported_main.css",
            ],
            [
                "/js/auth/login.js",
                "/js/small_screen.js"
            ],
            "login",
            true,
            true
        )
        // this.errors = null
        // this.formData = null
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
    errors = [];
    formData = {username: "", email: ""};

    constructor() {
        super(
            "Register now!",
            [
                "auth/register.css",
                 "auth/form_auth.css",
                 "not_supported/not_supported_main.css",
                ],
            [
                "/js/auth/register.js",
                "js/small_screen.js",
                "https://cdnjs.cloudflare.com/ajax/libs/validator/13.7.0/validator.min.js"
            ],
            "register",
            true,
            true
        )
        // this.errors = []
        // this.formData = {username: "", email: ""}
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
    email = "";
    error = "";

    constructor() {
        super(
            "Verify email",
            ["auth/form_auth.css", "auth/email_verify.css", "not_supported/not_supported_main.css",],
            [
                "/js/auth/verify_email.js",
                "js/small_screen.js",
                "https://cdnjs.cloudflare.com/ajax/libs/validator/13.7.0/validator.min.js"
            ],
            "verify_email",
            true,
            true
        )
        // this.email = ""
        // this.error = ""
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
    username: string | undefined = undefined;
    email: string | undefined = undefined;
    memberLength: number | undefined = undefined;
    savesNum: number | undefined = undefined;


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
                "saves_pagination.css",
                "scrollbar.css",
                "not_supported/not_supported_main.css",

            ],
            [
                "js/profile/profile_load_saves.js",
                "js/profile/search_items.js",
                "js/profile/profile_filter_liked.js",
                "js/profile/saves_pagination.js",

                "js/small_screen.js"
            ],
            "profile",
            true,
            true
        )
    }

    setUserStats(username: string, email: string, memberLength: number, savesNum: number) {
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
                "profile_item/page_selection.css",
                "scrollbar.css",
                "not_supported/not_supported_main.css",
            ],
            [
                "/js/item_edit_profile/load_item_binding.js",
                "/js/item_edit_profile/delete_item.js",
                "/js/item_edit_profile/use_item.js",
                "/js/item_edit_profile/edit_item_name_desc.js",
                "/js/item_edit_profile/public_priv_switch.js",
                "/js/item_edit_profile/item_toggle_like.js",
                "/js/item_edit_profile/page_selection.js",

                "js/small_screen.js"
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

class AboutPage extends ViewParams {
    constructor() {
        super(
            "About us",
            ["about/about_main.css"],
            [],
            "about_page",
            false,
            true
        )
    }

}
class NotSupportedPage extends ViewParams {
    constructor() {
        super(
            "Not supported",
            ["about/about_main.css"],
            [],
            "not_supported",
            false,
            false
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
    NotFoundPage,
    AboutPage,
    NotSupportedPage
}