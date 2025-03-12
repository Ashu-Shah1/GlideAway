import { Router } from 'express'
import jwt from 'jsonwebtoken'
const userRouter = Router()
import userModel from '../DataBase/db.js'
import bcrypt from 'bcrypt'
import z from 'zod'

const userInfoSchema = z.object({
    email:z.string().email("Invalid email format"),
    password:z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})
const signUpSchema = userInfoSchema.extend({
    name: z.string().min(1, "First name is required"),
})

userRouter.post('/signUp',async function(req,res){
    try{
        console.log(req.body)
        const validatedData = signUpSchema.parse(req.body)

        const {name,email,password} = validatedData

        const hashPassword = await bcrypt.hash(password,5)

        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword
        })
        console.log(newUser)
        res.status(200).json({msg :"user is signed up successfully"})

    }catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

userRouter.post('/signIn', async function(req, res) {
    try {
        const validatedData = userInfoSchema.parse(req.body)
        const { email, password } = validatedData;

        const findUser = await userModel.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }

        const passwordCompare = await bcrypt.compare(password, findUser.password);

        if (!passwordCompare) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: findUser._id.toString() }, 
            process.env.JWT_USER_SECRET, 
            { expiresIn: '1h' } // Optional: token expiry
        );

        res.cookie(token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000, // 1 hour
        });

        res.status(200).json({ message: "User logged in successfully",
            token:token
         });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default userRouter