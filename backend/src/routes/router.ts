import express from "express"
import aboutRouter from "./about_router"

const router = express.Router()

router.use("/api/about", aboutRouter)



//errors
// router.use((req: express.Request, res: express.Response) => {
//     res.status(404).json({
//         status: "error",
//         msg: "Route not found"
//     })
// })


export default router