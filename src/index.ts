import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoutes.ts"
import * as dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.json())

app.use('/api/v1/user', userRoute);

mongoose.connect(process.env.mongo_url || "http://localhost:27017").then(() => {
  console.log(`connected to mongoose port http://localhost:${process.env.PORT || 3000}`)
}).catch(err => console.error("Database connection error: ", err));
