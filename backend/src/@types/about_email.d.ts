import {Document, Model} from "mongoose"

export interface IAboutEmail extends Document {
    _id: string,
    email: string,
    insertDate: Date,
    findMethod: string
}

export interface IAboutEmailModel extends Model<IAboutEmail> {
    emailExists(email: string): Promise<boolean>
    findByFindMethod(method: string): Promise<IAboutEmail[]>
}