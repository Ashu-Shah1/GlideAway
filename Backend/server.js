import express from 'express';
import mongoose  from 'mongoose';
import { config } from 'dotenv';
config();
import userRouter from './Routes/user.js';
import districtRouter from './Routes/district.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/auth",userRouter)
app.use("/district", districtRouter);

async function main(){
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      } catch (err) {
        console.error("MongoDB connection error:", err);
      }
}
main()