import React, { useEffect } from 'react'
import axios from 'axios'
import {  useState} from 'react'
import Cards from "./Cards.js"

const Userblog = () => {
  const [blogs, setblogs] = useState()
  const id =localStorage.getItem("userid")
  const sendRequest=async()=>{
    const res=await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch(err=>console.log(err))
    const data= await res.data
    return data
  

  }
  useEffect(() => {
    sendRequest().then((data)=>setblogs(data.blogs.blogs))
    
  }, [])
  
  return (
    <div>{blogs&& blogs.map((blog,index)=>(
      <Cards  key={index}   name={"You"}  id={blog._id} isUser={true}title={blog.title} description={blog.description} imageUrl={blog.image} userName={blog.user.name}/> 
          ))}</div>
  )
}

export default Userblog