import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './Routes/user.js'
import CommunityRouter from './Routes/community.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/auth",userRouter)
app.use("/destination",userRouter)
app.use("/community-post",CommunityRouter)

async function main(){
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    
        const PORT = process.env.PORT;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      } catch (err) {
        console.error("MongoDB connection error:", err);
      }
}
main()