import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../utils/jwt";
import User from "../models/user_model";
import { IUser } from "../@types/user";


export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(" ")[1] // safely get the token from the auth header

        if (!token) {
            res.status(401).json({
                status: "error",
                msg: "No token provided"
            })
            return
        }

        //verfiy if JWT is valid
        const decoded = verifyJWT(token)
        if (!decoded) {
            res.status(403).json({
                status: "error",
                msg: "Invalid or expired token"
            })
            return
        }

        const user = await User.findById(decoded.userId)
        if (!user) {
            res.status(400).json({
                status: "error",
                msg: "User not found"
            })
            return
        }

        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Authentication error"
        })
    }
}

