import { Request, Response } from "express"

interface LoginRequest extends Request {
    body: {
        name: string,
        password: string
    }
}

const validateLogin = (req: LoginRequest, res: Response) => {
    try {
        let {name, password} = req.body

        //TODO - check with the database if the username and password are correct combianiton and check if the user isnt logged with sso
    } catch (error) {
        
    }

}

export {validateLogin}