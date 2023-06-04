import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { TextField,InputLabel ,Button,Box,Typography} from '@mui/material'

const Blogdetail = () => {
  const navigate=useNavigate()
  const [blog,setblog] = useState()
  const[inputs,setInputs]=useState()

  const id=useParams().id
  console.log(id)
  const fetchDetails=async()=>{
const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
const data=await res.data
console.log(data)
return data
  }
  useEffect(() => {
    fetchDetails().then((data)=>{setblog(data.blogs) 
      console.log(data.blogs)
      setInputs({title:data.blogs.title,
      description:data.blogs.description})
      

    })
    
  }, [id])

  
  const sendRequest=async()=>{
    const res=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err))
    const data=await res.data
console.log(data)
  
  }

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
    
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
            
            sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myblogs"))
    //console.log(inputs)

  }
  
  return (
    <div> { inputs && <form on onSubmit={handleSubmit}>
    <Box border={3} borderColor="grey" borderRadius={10} boxShadow="10px 10px 20px #ccc"  padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection="column" width="80%">
      <Typography fontWeight={"bold"} padding={3} color="black" variant='h2' textAlign={"center"}>Post Your Blog</Typography>
      <InputLabel sx={{mb:1,mt:2,fontsixe:"24px", fontWeight:"bold" }}>Title</InputLabel>
       <TextField nargin="auto" variant="outlined" name="title" value={inputs.title} onChange={handleChange}/> 
       <InputLabel sx={{mb:1,mt:2,fontsixe:"24px", fontWeight:"bold" }}>Discription</InputLabel>
        <TextField nargin="auto" variant="outlined" name="description" value={inputs.description} onChange={handleChange}/>
        
        <Button  type="submit"variant ="contained"   sx={{borderRadius:3,marginTop:3}} color="warning"  >Post</Button>
    </Box>
  </form>}</div>
  )
}

export default Blogdetail