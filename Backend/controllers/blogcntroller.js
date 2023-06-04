import mongoose from "mongoose";
import Blog from "../model/blog.js"
import User from "../model/users.js";
export const getallbogs=async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find().populate("user")

    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        res.status(404).json({message:"NoBlogs Found"})
    }
    return res.status(200).json({blogs})

}
export const addblogs=async(req,res,next)=>{
    const{title,description,image,user}=req.body
    let existinguser;
    try{
        existinguser=await User.findById(user)
        console.log(existinguser)

    }catch(err){

        return console.log(err)
    }
    if(!existinguser){
        return res.status(400).json({message:"Unable to find user by this id "})
    }
    const blog=new Blog({
        title:title,
        description:description,
        image:image,
        user:user

    })
    //const session = await mongoose.startSession();
//session.startTransaction();

try {
  await blog.save();
   existinguser.blogs.push(blog);
  await existinguser.save();

  //await session.commitTransaction();
  //session.endSession();
} catch (error) {
  return console.error('Error during transaction:', error.message);
  //await session.abortTransaction();
  //session.endSession();
}

    return res.status(200).json({blog})
}
export const updateblog=async(req,res,next)=>{ 
    const {title,description}=req.body
    const blogid=req.params.id
    let blog
    try{
        blog=await Blog.findByIdAndUpdate(blogid,{
            title,
            description
    
        })
        

    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog})
    
}
export const blogbyid=async(req,res,next)=>{
    const blogid=req.params.id
    let blogs
    try{
        blogs=await Blog.findById(blogid)

    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        res.status(404).json({message:"NoBlogs Found"})
    }
    return res.status(200).json({blogs})
}
export const deleteblog=async(req,res,next)=>{
    const blogid=req.params.id
    let blogs
    try{
        blogs=await Blog.findByIdAndRemove(blogid).populate('user')
        await blogs.user.blogs.pull(blogs)
        await blogs.user.save()

    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        res.status(500).json({message:"unable to Delete"})
    }
    return res.status(200).json({message:"successfull deletion"})
}
export const getuserid=async(req,res,next)=>{
    const userid=req.params.id
    let userblogs
    try{
        userblogs=await User.findById(userid).populate("blogs")
    }
    catch(err){
        return console.log(err)
    }
    if(!userblogs){
        return res.ststus(404).json({meassage:"NO blogs Found"})
    }
    return res.status(200).json({blogs:userblogs})

}