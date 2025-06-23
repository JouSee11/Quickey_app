class ViewParams {
    title: string
    stylesheets: string[]
    scripts: string[]
    content: string 
    headerBool: boolean
    footerBool: boolean

    constructor(title: string, stylesheets: string[], scripts: string[], content: string, headerBool: boolean, footerBool: boolean) {
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
            footerBool: this.footerBool,
        }
    }
}


export  {ViewParams}