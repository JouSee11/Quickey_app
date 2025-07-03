import {Request, Response, NextFunction} from 'express'

interface validationError {
    field: string,
    message: string
}

const registerFormValidation = async (req: Request, res: Response, next: NextFunction) => {
    let {username , email, paswword, passwordConfirm} = req.body
    let errors: validationError[] = []

    username = username?.trim()
    username = email?.trim()

    next()
}

export {registerFormValidation}