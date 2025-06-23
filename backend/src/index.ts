import express, { ErrorRequestHandler } from "express"
import dotenv from "dotenv"
import router from "./routes/router"
import connectDB from "./db/connectDB"
import mongoose from "mongoose"

const app = express()
dotenv.config()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// error handling for invalid json syntax
const invalidJsonHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (
    err instanceof SyntaxError &&
    (err as any).status === 400 &&
    'body' in err
  ) {
    res.status(400).json({
      status: 'error',
      msg: 'Invalid JSON body',
    })
    return 
  }
  next(err)
}
app.use(invalidJsonHandler)

app.use("", router)

const PORT: number = Number(process.env.PORT) || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI as string)


        const server = app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })

        //correct shutdown
        process.on("SIGINT", async () => {
            console.log("Shutting down server ...")
            await mongoose.disconnect()
            server.close(() => {
                process.exit(0)
            })
            
        })

    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

start()