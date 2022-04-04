import React,{useContext,useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton,Container ,Grid} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// import {  } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {setModal,auth,trackCard} from '../App.js';
import {GetBlog,GetBlogHome} from '../services/Apis'


 
export default function ActionAreaCard() {


    const StatusModal  = useContext(setModal);
    const user  = useContext(auth);
    const track  = useContext(trackCard);
    const [cards,setCards] = useState(null);
    
    
    
    useEffect(() => {
        let response  =( (window.location.pathname === '/dashboard') ? GetBlog(user) : GetBlogHome());
        response.then((data)=>{setCards(data.data); console.log(data)})
    }, [StatusModal.stateModal]);
 

   


    function genrateCard(data){
        
        return (  
    <Grid item  xs={12} sm={4} md={4} >
        
        <Card sx={{maxWidth: 300, margin : 'auto'}} >
        <CardActionArea>
            <CardMedia
            component="img"
            width="10"
            height = '250'
            image={'https://picsum.photos/200/300'}
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom align = 'center' variant="h5" component="div">
                {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               {data.descripition}
            </Typography>
            </CardContent>


            <IconButton sx = {{margin : 'auto',display : 'block'}} aria-label="read more" size="small">
                <KeyboardDoubleArrowDownIcon color = 'primary' fontSize="large" />
            </IconButton>


           {/* {data.uuid !== undefined ? <Like uuid = {data.uuid}/> : null}  */}
             
            {/* <Button size = 'small' color = 'primary' onClick= {()=>{ StatusModal.toogleModal(true); track.setTracker({uuid : data.uuid}); StatusModal.setFormType('comment')}} startIcon = {<ModeCommentOutlinedIcon/>} ></Button> */}
        </CardActionArea>
        </Card>
    </Grid>
        )
    }

  return (
      <>

    <Container fixed sx = {{display : 'flex'}}  >
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} margin = 'auto'  >
        {cards !==null && cards.map((data) => { 
            // getLike(data.uuid)
            return genrateCard(data)}) }
    </Grid>
    </Container>
    </>
  );
}
