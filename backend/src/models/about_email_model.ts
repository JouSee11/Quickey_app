import mongoose, {Schema} from "mongoose";
import { IAboutEmail, IAboutEmailModel } from "../@types/about_email.js";


const aboutEmailSchema = new Schema<IAboutEmail>({
    email: {
        type: String,
        required: [true, "email is requiered"],
        unique: true,
    },
    findMethod: {
        type: String,
        required: [true, "Find method is requiered"],
        unique: false
    },
    insertDate: {
        type: Date,
        default: Date.now
    }
})

//statics call on the schema not individual document
aboutEmailSchema.statics.emailExists = function (email: string) {
    return this.exists({email})
}

aboutEmailSchema.statics.findByFindMethod = function (findMethod: string) {
    return this.find({ findMethod });
}

const AboutEmail = mongoose.model<IAboutEmail, IAboutEmailModel>("AboutEmail", aboutEmailSchema)

export default AboutEmail