import { Request, Response, NextFunction } from "express"
import { IUser } from "../../@types/user"
import { generateJWT, generateRefreshToken, verifyJWT } from "../../utils/jwt"
import User from "../../models/user_model"


export const ssoCallback = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as IUser 

        if (!user) {
            res.status(401).json({
                status: "error",
                msg: "Authentication failed"
            })
        }

        const accessToken = generateJWT(user)
        const refreshToken = generateRefreshToken(user)

        res.status(200).json({
            status: "success",
            msg: "Login successfull",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                    //later possibly add some other more staff that i would need to show on the profile
                },
                tokens: {
                    accessToken,
                    refreshToken,
                    tokenType: "Bearer"
                }
            }
        })
    } catch (error) {
        res.status(500).json({status: 'error', msg: "Token generation failed"})
    } 
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const {refreshToken} = req.body

        if (!refreshToken) {
            res.status(401).json({
                status: "error",
                msg: "Refresh token not provided"
            })
            return
        }

        const decoded = verifyJWT(refreshToken)
        if (!decoded) {
            res.status(403).json({
                status: "error",
                msg: "Refresh token is not valid"
            })
            return
        }

        const user = await User.findById(decoded.userId)
        if (!user) {
            res.status(403).json({
                status: "error",
                msg: "User not found"
            })
            return
        }

        const newAccessToken = generateJWT(user)
        
        res.status(200).json({
            status: "success",
            msg: "token created successfully",
            data: {
                accessToken: newAccessToken,
                tokenType: "Bearer"
            }
            
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Token refresh failed"
        })
    }
}

// export const githubCallback = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user as IUser 
//         console.log(user._id)
//         res.status(400).json({msg: 'error'})
//     } catch (error) {
//         res.status(400).json({msg: 'error'})

//     } 
// }

