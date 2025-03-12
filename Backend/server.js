import express from 'express';
import mongoose  from 'mongoose';
import { config } from 'dotenv';
config();
import userRouter from './Routes/user.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/auth",userRouter)

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log("connected to the database")
    app.listen(process.env.PORT)
}
main()