import rateLimit from 'express-rate-limit'
import {Request, Response} from 'express'

export const registrationLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 7,
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

//limit the general app usage for 1 per second
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

