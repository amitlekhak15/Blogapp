import blog from "../model/blog.js";
import User from "../model/users.js";
import bcrypt from "bcrypt"
const saltRounds = 10
export const getalluser=async(req,res,next)=>{
    let users
    try{
        users=await User.find()

    }
    catch(err){
        console.log(err)

    }
    if(!users){
        return res.status(404).json({message:"NO users Found"})
    }
    else{
        return res.status(200).json({users})
    }


}
export const signup=async(req,res,next)=>{
    const{name,email,password}=req.body
    let existinguser
    try{
        existinguser=await User.findOne({email})

    }catch(err){
        console.log(err)

    }
    if(existinguser){
        return res.status(400).json("User Aleready Exist")
    }
    const hash = bcrypt.hashSync(password, saltRounds)
    console.log(hash)
    const user=new User({
        name:name,
        email:email,
        password:hash,
        blogs:[]

    })
    try{
       await user.save()
    }catch(err){
        console.log(err)
    }
    return res.status(200).json({user})


}
export const login=async(req,res,next)=>{
    const{email,password}=req.body
    let existinguser
    try{
        existinguser=await User.findOne({email})

    }catch(err){
        console.log(err)

    }
    if(!existinguser){
        return res.status(404).json("User didnt Exist")
    }
    const isPasswordcorrect=bcrypt.compareSync(password, existinguser.password)
    if(!isPasswordcorrect){
        return res.status(400).json({message:"Incorrect  password"})
    }
    return res.status(200).json ({message:"You are loged in",existinguser})



}
