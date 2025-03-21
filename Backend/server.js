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
app.use("/destination",userRouter)

async function main(){
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      } catch (err) {
        console.error("MongoDB connection error:", err);
      }
}
main()