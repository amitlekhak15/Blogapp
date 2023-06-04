import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Cards = ({id,name,isUser,title,description,imageUrl,userName}) => {
    const navigate=useNavigate()
    const handleedit=(e)=>{
        
    console.log(id)
     navigate(`/myblogs/${id}`)
    }
    const deleterequest=async()=>{
        const res=await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
        const data=await res.data
        return data
    }
    const handleDelete=()=>{
      deleterequest().then((data)=>console.log(data)).then(()=>navigate("/myblogs"))
    }
  return (
    <div><Card sx={{width:"40%" ,margin: "auto",mt:2,padding:2,boxShadow:"5px 5px 10px #ccc" ,":hover":{
        boxShadow:"10px 10px 20px #ccc  "
    }}}>
        {isUser &&(<Box dispaly="flex"  marginLeft={65}>
            <IconButton  onClick={handleedit}   ><EditIcon/> </IconButton>
            <IconButton onClick={handleDelete}> <DeleteIcon/></IconButton>
        </Box>)}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {userName}
        </Avatar>
      }
      
      title={title}
      subheader="September 14, 2016"
    />
    <CardMedia
      component="img"
      height="194"
      image={imageUrl}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {name }:
        {description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        
      </IconButton>
      <IconButton aria-label="share">
        
      </IconButton>
      
    </CardActions>
    
  </Card>s</div>
  )
}

export default Cards