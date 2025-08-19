import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "./db.js"
import zod from "zod"
dotenv.config()

const zodValidator = zod.object({
    username: zod.string().min(6),
    password: zod.string().min(6)
})
const app = express();

app.use(express.json());

app.post("/api/v1/sinup", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const isUserPresent = await User.findOne({
        username: username
    })

    if(zodValidator.safeParse({username,password}).success)
    {
        return res.status(402).json({
            message: "Usernaem and Passsword input error please check"
        }) 
    }

    if(isUserPresent){
        return res.status(401).json({
            message: "this "+username + " user already present"
        })
    }

    await User.create({
        username: username,
        password:password
    })

    res.json({
        message: "user signed up"
    })
})

app.listen(3000,()=>{
console.log("server is running on port 3000")
})
