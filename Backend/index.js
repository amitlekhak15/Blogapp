import express from "express";
import mongoose from "mongoose"
import router from "./routes/usersroutes.js";
import blogrouter from "./routes/blogroutes.js";
import cors from "cors"

const app=express()
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/Blog").then(()=>console.log("database connected")).catch((err)=>console.log(err))
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",blogrouter)

app.listen(5000)