import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

import userRouter from './Routes/user.js';
import CommunityRouter from './Routes/community.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: 'http://localhost:5173',  // Any path under this domain will work
  credentials: true,  // Allow sending credentials (cookies, etc.)
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(ClerkExpressWithAuth());
// Your routes
app.use("/auth", userRouter);
app.use("/destination", userRouter);
app.use("/community-post", CommunityRouter);

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

main();
