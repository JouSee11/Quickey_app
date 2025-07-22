import rateLimit from 'express-rate-limit'
import {Request, Response} from 'express'

//5 registrations per 10 minutes
export const registrationLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: 'error',
        msg: 'Too many registration attempts, try again later.',
    },
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            status: 'error',
            msg: 'Too many registration attempts. Please try again later.',
        })
    }
})

//
export const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        status: 'error',
        msg: 'Too many login attempts, try again later.',
    },
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            status: 'error',
            msg: 'Too many login attempts. Please try again later.',
        })
    }
})

//limit the general app usage to 100 requests per minute
export const generalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        status: 'error',
        msg: 'Too many requests.',
    },
    standardHeaders: true,
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            status: 'error',
            msg: 'Too many requests.',
            retryAfter: 60
        })
    }
})

