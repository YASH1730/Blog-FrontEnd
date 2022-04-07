
import React,{useState} from 'react'
import Navbar from './Navbar';
import Card from './Card';
import Footer from './Footer';
import LogModal from './LogModal';
import {setModal} from '../context/Context.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import banner from '../asset/img/banner.jpg'
import {Box,
    Typography
} from '@material-ui/core';


function Home() {

  return (
    <>
    {/* <Box sx = {{width : '100%',position : 'absolute', height : '70vh',overflow : 'hidden'}}>
      <img src={banner} style = {{width : 'inherit',maxHeight : '70vh'}} alt="" srcset="" />
    </Box> */}
      
    <br/>
    <Typography sx = {{position :'relative',marginTop : '50%'}} variant="h4" align = 'center'  component="div">
      Blog Time      
      </Typography>
    <br/>
            <Card/>
    </>
  );
}

export default Home;

export {setModal};