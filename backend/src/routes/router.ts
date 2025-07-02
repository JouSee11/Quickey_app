import express from "express"
import aboutRouter from "./about_router"
import authRouter from './auth_router'

const router = express.Router()

router.use("/api/about", aboutRouter)

router.use("/api/auth", authRouter)



//errors
// router.use((req: express.Request, res: express.Response) => {
//     res.status(404).json({
//         status: "error",
//         msg: "Route not found"
//     })
// })


export default router