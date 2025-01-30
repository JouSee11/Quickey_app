import express from "express"
// import keysRouter from "./routes/key-bindings.js"
const app = express()

//middleware
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("./public"))
// app.use("/save-to-device", keysRouter)



const port = 3000
app.listen(3000, () => {
    console.log(`App is listening on port ${port}...`)
})