
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from './components/Auth';
import Blogs from "./components/Blogs"
import Header from './components/Header';
import React, { useEffect } from "react"
import Userblog from './components/Userblog';
import Blogdetail from './components/Blogdetail';
import Addblog from './components/Addblog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';

function App() {
  const dispatch=useDispatch()
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  useEffect(() => {
  if(localStorage.getItem("userid")){
    dispatch(authActions.login())
  }

  }, [dispatch])
  
  return (

      <React.Fragment>
        <header>
        <Header/>

        </header>
        <main>
          <Routes>
            <Route path="/auth" element={<Auth/>}></Route>
            <Route path="/blogs" element={<Blogs/>}></Route>
            <Route path="/myblogs" element={<Userblog/>}></Route>
            <Route path="/myblogs/:id" element={<Blogdetail/>}></Route>
            <Route path="/blogs/add" element={<Addblog/>}></Route>


            </Routes>
        </main>
        
      </React.Fragment>
    
    
  )
}

export default App;
