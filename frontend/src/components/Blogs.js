import React from 'react'
import axios from "axios"
import { useEventCallback } from '@mui/material'
import { useEffect ,useState} from 'react'
import Cards from "./Cards.js"
const Blogs = () => {
  const [blogs, setblogs] = useState()
  const sendRequest=async()=>{
    const res=await axios.get("http://localhost:5000/api/blog").catch(err=>console.log(err))
    const data= await res.data
    return data
  
  }
  useEffect(() => {
  sendRequest().then((data)=>setblogs(data.blogs))
  }, [])
  
  return (
  
    <div> {blogs&& blogs.map((blog,index)=>(
<Cards   key={index}
id={blog._id}
name={blog.user.name}
isUser={localStorage.getItem("userid")===blog.user._id}
title={blog.title} description={blog.description} imageUrl={blog.image} userName={blog.user.name}/> 
    ))} </div>
  )
}

export default Blogs