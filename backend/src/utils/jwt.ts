import { IUser } from "../@types/user"
import jwt, { JwtPayload } from 'jsonwebtoken'
import {Request, Response} from "express"
import { authenticateToken } from "../middleware/auth_middleware"
import User from "../models/user_model"

interface JWTPayload {
    userId: string
}

interface RefreshTokenPayload {
    userId: string,
    tokenType: 'refresh'
}

export const generateJWT = (user: IUser) => {
    const payload: JWTPayload = {
        userId: user._id
    }

    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
            issuer: 'quickey-api',
            audience: 'quickey-client'
        } as jwt.SignOptions
    )
}

export const verifyJWT = (token: string): JWTPayload | null => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload
    } catch (error) {
        return null
    }
}


// refresh tokens
export const generateRefreshToken = (user: IUser) => {
    const payload: RefreshTokenPayload = {
        userId: user._id,
        tokenType: 'refresh'
    }

    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {expiresIn: process.env.JWT_EXPIRES_REFRESH || '1d'} as jwt.SignOptions
    )
}

export const verifyRefreshToken = (token: string): RefreshTokenPayload | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as RefreshTokenPayload

        if (decoded.tokenType !== 'refresh') {
            throw new Error('Invalid token type')
        }

        return decoded
    } catch (error) { 
        return null
    }
}

