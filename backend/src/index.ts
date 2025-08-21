import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Content, User } from "./db.js"
import zod, { boolean } from "zod"
import { ParseStatus } from "zod/v3"


dotenv.config()

if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL environment variable is not defined.");
}
mongoose.connect(process.env.MONGO_URL,{
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,
})

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

app.post("/api/v1/signip", async (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;

    const userdata = await User.findOne({username: username, password:password});
    if(!userdata)
    {
        return res.status(401).json({
            message: "user not found"
        })
    }
    return res.json({
        userdata
    })
})  

app.post("/api/v1/content", async (req,res)=>{
//     {
// 	"type": "document" | "tweet" | "youtube" | "link",
// 	"link": "url",
// 	"title": "Title of doc/video",
// 	"tags": ["productivity", "politics", ...]
// }
try{
    const data  = req.body;
    const contentData = await Content.create(data);
    res.json({
        message: "content created",
        content: contentData
    })
}catch(error){
    console.log(error)
    return res.status(402).json({
        message: error
    })
}

})


app.get("/api/v1/content", async (req, res)=>{
    try{
    const contentData = await Content.find({})

    }catch(error)
    {
        return res.status(500).json({
            message: "internal server error"
        })
    }
})

app.delete("/api/v1/content", async(req ,res)=>{
    const contentId = req.body.contentId;
    try{
        await Content.deleteOne({_id:contentId})
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({
            message:  "internal server error",
            error: error
        })
    }
})

app.listen(3000,()=>{
console.log("server is running on port 3000")
})
