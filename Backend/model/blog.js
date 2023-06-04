import express from "express";
import mongoose from "mongoose";
import Blog from "../model/blog.js"
import User from "../model/users.js"
const Schema=mongoose.Schema
const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true


    }

})
export default mongoose.model("Blog",blogSchema)