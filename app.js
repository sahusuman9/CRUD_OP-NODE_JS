import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import productRouter from './routes/productRouter.js'

let app = express()


dotenv.config({path:'./config/config.env'})

let port = process.env.PORT
let host = process.env.HOST
let url = process.env.DB_URL

app.use(morgan("dev"))

app.use(express.json())

app.get("/", (req,resp) => {
    resp.send("<h1>Home Page</h1>")
})

app.use("/api", productRouter)

mongoose.connect(url).then((response) => {
    console.log(`MongoDB connection successfull`)
}).catch((err) => {
    console.log(err)
    console.log(`Unable to Connect`)
    process.exit(1)
})

app.listen(port,host, (err) => {
    if(err) throw err
    console.log(`Server is running on: http://${host}:${port}`)
})
