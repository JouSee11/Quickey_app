class ViewParams {
    constructor(title, stylesheets, scripts, content, headerBool, footerBool) {
        this.title = title
        this.stylesheets = stylesheets
        this.scripts = scripts
        this.content = content
        this.headerBool = headerBool
        this.footerBool = footerBool
        this.errors = []
        this.formData = []
        this.extraData = [] 
    }

    setErrors(errorList) {
        this.errors = errorList
    }

    setFormData(formData) {
        this.formData = formData
    }

    insertData(data) {
        this.extraData.push(data)
    }

    getDetails() {
        return {
            title: this.title,
            stylesheets: this.stylesheets,
            scripts: this.scripts,
            content: this.content,
            headerBool: this.headerBool,
            footerBool: this.footerBool,
            errors: this.errors,
            formData: this.formData,
            extraData: this.extraData
        }
    }
}

// class ViewParamsForm {
//     constructor(title, stylesheets, scripts, content, headerBool, footerBool) {
//         this.title = title
//         this.stylesheets = stylesheets
//         this.scripts = scripts
//         this.content = content
//         this.headerBool = headerBool
//         this.footerBool = footerBool
//         this.errors = []
//         this.formData = []
//     }

//     setErrors(errorList) {
//         this.errors = errorList
//     }

//     setFormData(formData) {
//         this.formData = formData
//     }

//     getDetails() {
//         return {
//             title: this.title,
//             stylesheets: this.stylesheets,
//             scripts: this.scripts,
//             content: this.content,
//             headerBool: this.headerBool,
//             footerBool: this.footerBool,
//             errors: this.errors,
//             formData: this.formData
//         }
//     }
// }

export  {ViewParams}