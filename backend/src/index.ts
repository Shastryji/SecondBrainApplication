import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(express.json());

app.post("/api/v1/sinup", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
})
