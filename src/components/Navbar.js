import React,{useContext} from 'react';
import {Grid,
    Typography,
    Button
} from '@material-ui/core';
import logo from '../asset/img/logo.png'
import '../asset/css/navbar.css'
import {setModal,auth} from '../App.js'
import { Outlet, Link } from "react-router-dom";


export default function Navbar() {

  const StatusModal  = useContext(setModal);
  const userAuth  = useContext(auth);

  const LinkStyle = {
    textDecoration : 'none',
    color : 'black'

  }

  const handelLogout = ()=>{
    userAuth.setCred({token : null,userName : null})
    localStorage.clear();
    window.location = '/'
  }


  return (
    <>
    <Grid container spacing = {0.5}  className = 'navContainer'>
    
    {/* logo box */}
    <Grid item xs={3} className = 'logoBox'> 
    <img src={logo} alt = "logo"/> 
     <Typography gutterBottom variant="h5" component="div">
                MyBlog
            </Typography>
    </Grid>

    {/* navLink */}
    <Grid item xs={6} className = 'navLinkBox'> 
    <Link style = {LinkStyle} to = '/'>Home</Link> 
    {userAuth.cerdential.token !== null && <Link style = {LinkStyle} to = '/dashboard'>Dashboard</Link>}
    <Link style = {LinkStyle} to  = '/about'>About</Link>
    </Grid>

    {/* logButton */}
    <Grid item xs={3}  className = 'logButtonBox'> 
    {/* {console.log(StatusModal)} */}
    {userAuth.cerdential.token !== null ? 
    
      (<Button size = 'small' variant="contained" color = '#8b8b8b7a' onClick= {()=>{ handelLogout() }} >Logout</Button>)
      :(<>
      <Button size = 'small' variant="outlined" color = '#8b8b8b7a' onClick= {()=>{StatusModal.toogleModal(true); StatusModal.setFormType('logIn')}} >Login</Button>
      <Button size = 'small' variant="contained" color = '#8b8b8b7a' onClick= {()=>{StatusModal.toogleModal(true); StatusModal.setFormType('enRoll') }} >Enroll</Button>
      </>)}
            
            
    </Grid>

    </Grid>
    <Outlet/>
    </>
  )
}
