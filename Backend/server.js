import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:'frontend/Backend/.env'});
import userRouter from './Routes/user.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/auth",userRouter)
app.use("/destination",userRouter)

async function main(){
    try {
        await mongoose.connect("mongodb+srv://gauravsinghnegi54:DONjii@cluster0.notds.mongodb.net/GlideAway-Web");
        console.log("Connected to MongoDB");
    
        const PORT = 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      } catch (err) {
        console.error("MongoDB connection error:", err);
      }
}
main()