class ViewParams {
    constructor(title, stylesheets, scripts, content, headerBool, footerBool) {
        this.title = title
        this.stylesheets = stylesheets
        this.scripts = scripts
        this.content = content
        this.headerBool = headerBool
        this.footerBool = footerBool
    }

    getDetails() {
        return {
            title: this.title,
            stylesheets: this.stylesheets,
            scripts: this.scripts,
            content: this.content,
            headerBool: this.headerBool,
            footerBool: this.footerBool
        }
    }

}

export default ViewParams