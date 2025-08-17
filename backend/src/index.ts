import express from "express"
import bcrypt from "bcrypt"
import { User } from "./db.js";
import z from "zod"

const schema = z.object({
    username: z.string().min(6),
    password: z.string().min(6)
}) //user the parse or safeParse method for validation

const app = express();

 app.post("/api/v1/signup", async (req,res)=>{
    const username = req.body.username;
    const get_pass = req.body.password;
    const password = bcrypt.hash(await bcrypt.genSalt(10),get_pass,)
    const user_is_present = await User.findOne({username:username})
    if(user_is_present)
    {
        return res.status(401).json({
            message: "user already present"
        })
    }
    // add validation for the username and password
    // new username should not be present inside the database
    // password must contain 1 number, 1 letter and must have minimum 6 length

    //saving password
    const user = await User.create({
        username: username,
        password: password
    })
    
    return res.status(200).json({
        username: username,
        password: password
    })

 })

 app.post("/api/v1/signin",(req,res)=>{

 })

app.listen(3000,()=>{
    console.log("server is running in port 3000")
})