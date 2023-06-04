import React from 'react'
import {AppBar, Box,Button, Tab, Tabs, Toolbar, Typography} from "@mui/material"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'


const Header = () => {
    const dispatch=useDispatch()
    const [value, setvalue] = useState()
    const isLoggedIn=useSelector(state=>state.isLoggedIn)
  return (
    
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'>
                Blogmania

            </Typography>
            {isLoggedIn && <Box display='flex' marginLeft={"auto"} marginRight={"auto"}>
                <Tabs  textColor='inherit'
                value={value} onChange={(e,val)=>setvalue(val)}>
                    <Tab LinkComponent={Link} to= "/blogs" label="All Blogs" color="warning"/>
                    <Tab LinkComponent={Link} to= "/myblogs" label="MyBlogs" color="warning"/>
                    <Tab LinkComponent={Link} to= "/blogs/add" label="addBlogs" color="warning"/>
                </Tabs>

            </Box>}
            <Box display='flex' marginLeft='auto'>
                {! isLoggedIn && <>
                    <Button LinkComponent={Link} to= "/auth"  
                variant='contained' sx={{margin:1,borderRadius:10}}   color="warning"> Login</Button>
                <Button  LinkComponent={Link} to= "/auth"
                variant='contained'  sx={{margin:1,borderRadius:10}}color="warning">Signup</Button>

                </>}
                
                {isLoggedIn&&<Button  onClick={()=>dispatch(authActions.logout( ))} LinkComponent={Link} to= "/auth"
                variant='contained'  sx={{margin:1,borderRadius:10}}color="warning">Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header