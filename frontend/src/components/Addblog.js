import { InputLabel, TextField, Typography,Box, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios  from "axios"
const Addblog = () => {
  const sendrequest=async()=>{
    const res=await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:localStorage.getItem("userid")
    }).catch(err=>console.log(err))
    const data=await res.data
    return data

  }
  const[inputs,setInputs]=useState({
    title:"",
    description:"",
    image:"",

  })

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    sendrequest().then((data)=>console.log(data))
    //console.log(inputs)

  }
  return (
    <form on onSubmit={handleSubmit}>
      <Box border={3} borderColor="grey" borderRadius={10} boxShadow="10px 10px 20px #ccc"  padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection="column" width="80%">
        <Typography fontWeight={"bold"} padding={3} color="black" variant='h2' textAlign={"center"}>Post Your Blog</Typography>
        <InputLabel sx={{mb:1,mt:2,fontsixe:"24px", fontWeight:"bold" }}>Title</InputLabel>
         <TextField nargin="auto" variant="outlined" name="title" value={inputs.title} onChange={handleChange}/> 
         <InputLabel sx={{mb:1,mt:2,fontsixe:"24px", fontWeight:"bold" }}>Discription</InputLabel>
          <TextField nargin="auto" variant="outlined" name="description" value={inputs.description} onChange={handleChange}/>
          <InputLabel sx={{mb:1,mt:2,fontsixe:"24px", fontWeight:"bold" }}>ImageUrl</InputLabel>
          <TextField nargin="auto" variant="outlined" name="image" value={inputs.image } onChange={handleChange}/>
          <Button  type="submit"variant ="contained"   sx={{borderRadius:3,marginTop:3}} color="warning"  >Post</Button>
      </Box>
    </form>
  )
}

export default Addblog