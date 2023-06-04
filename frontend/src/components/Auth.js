import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import {useState} from "react"
import axios  from "axios"
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[inputs,setInputs]=useState({
    name:"",
    email:"",
    password:"",

  })
  const[isSignup,setisSignup]=useState(false)
  const sendRequest=async(type="login")=>{
    const res=await axios.post(`http://localhost:5000/api/user/${type}`,{
    name:inputs.name,
    email:inputs.email,
    password:inputs.password
    }).catch(err=>console.log(err))
    const data=await res.data
    console.log(data)
    return data 
  }
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
      
    }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs)
    if(isSignup){
      sendRequest("signup").then((data)=>localStorage.setItem("userid",data.user._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data))
      
    }
    else{
      sendRequest().then((data)=>localStorage.setItem("userid",data.existinguser._id)).then(()=>dispatch(authActions.login())).then(()=>navigate("/blogs")) .then(data=>console.log(data))
    }
    

  }
  return (
    <form onSubmit={handleSubmit}>
      <Box maxWidth={400}  display="flex" flexDirection="column" alignItems="center" justifyContent="center"  boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5}borderRadius={5}>
        <Typography  variant='h2' padding={3}textAlign={"center"} >{isSignup?"SignUp":"Login"}</Typography>
        {isSignup &&<TextField name="name"onChange={handleChange}  placeholder='Name' value={inputs.name} margin="normal"></TextField>}{''}
        <TextField name="email" onChange={handleChange} type={"email"} placeholder="Email"  value={inputs.email} margin="normal"></TextField>
        <TextField name="password" onChange={handleChange} type={"password"}  value={inputs.password} placeholder="password" margin="normal"></TextField>
        
        <Button  type="submit"variant ="contained"   sx={{borderRadius:3,marginTop:3}} color="warning">Submit</Button>
        <Button onClick={()=>setisSignup(!isSignup)} sx={{borderRadius:3, marginTop:3}}>Change To {isSignup?"Login":"SignUp"}</Button>

      </Box>
    </form>
  )
}

export default Auth