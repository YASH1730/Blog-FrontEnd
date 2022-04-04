import React from 'react';
import {
    Typography,
    Container
} from '@material-ui/core';
import '../asset/css/navbar.css'

export default function Footer() {

  const FooterStyle = {  
    width: '100%',
    height: 'fit-content',
    marginTop: 'auto',
    backgroundColor : '#004270' ,
    color : 'white',
    textAlign : 'center',
    paddingTop : '10px'
  }


  return (
      <>
      <br/>
      <Container style = {FooterStyle}  maxWidth = 'flase' >
            <Typography   component="div">copyright@MyBlog</Typography>      
     </Container>
      </>
  )
}