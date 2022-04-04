import React,{useContext} from 'react';
import {Grid,IconButton,Button,
    Typography
    ,Container,Card,CardActionArea,CardMedia,CardContent
} from '@material-ui/core';
import user from '../asset/img/user.svg'
import ActionAreaCard from  './Card';
import '../asset/css/navbar.css';
import {setModal,auth} from '../App.js';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


import logo from '../asset/img/image.png'


export default function Dashboard() {
    const userAuth  = useContext(auth);
    const StatusModal  = useContext(setModal);
    
    return(
    <>
    <br/>

{/* user details  */}
    <Container fixed style = {{maxWidth : '700px'}} sx = {{display : 'flex'}} justifyContent="center" alignItem = 'center'>
        
        <Grid container spacing={1} justifyContent = 'center' columns={{ xs: 4, sm: 8, md: 12 }} margin = 'auto'>
            <Grid item style = {{display : 'contents'}} xs={12}  md={12}>
                <img width = '200px' src = {user} alt = 'user'></img>
            </Grid>
        </Grid>

        <br/>
        <Typography variant = 'overline' gutterBottom align = 'center' component = 'div'>
            {userAuth.cerdential.userName}
            </Typography>
    
        <Grid container style = {{    display: 'grid',
    gridAutoFlow: 'column'}} spacing= {2} justifyContent = 'center'  columns={{ xs: 4, sm: 8, md: 12 }} margin = 'auto'>

            <Grid item  xs = {4} > 
            <Button  variant="outlined" startIcon={<HistoryEduIcon />}>
            0
            </Button></Grid>

            <Grid item xs = {4} > <Button variant="outlined" startIcon={<MailOutlineIcon />}>
            {userAuth.cerdential.userEmail}
            </Button></Grid>

            <Grid item xs = {4} > <Button onClick= {()=>{StatusModal.toogleModal(true); StatusModal.setFormType('blog')}}  variant="outlined" startIcon={<AddCircleOutlineRoundedIcon />}>
            Add
            </Button></Grid>


        </Grid>
    
    </Container> 

{/* Card  */}
    <br/>
        <Typography variant = 'h4' align = 'center' > My Blogs </Typography>
    <br/>
        <ActionAreaCard/>
    
    <br/>
    <Container fixed style = {{maxWidth : '700px'}} sx = {{display : 'flex'}} justifyContent="center" alignItem = 'center'>
        <Typography variant = 'h5' align = 'center' > Write more blog? </Typography>
   
    <br/>
       
        <IconButton onClick= {()=>{StatusModal.toogleModal(true); StatusModal.setFormType('blog')}} style = {{display : 'block',fontSize:"3rem", margin : 'auto'}} aria-label="add" color="primary" size = 'large' >
        <AddCircleOutlineRoundedIcon fontSize="inherit"/>
      </IconButton>
    </Container>
    </>
    )
}