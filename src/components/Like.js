import React,{useState,useContext} from 'react';
import {auth} from '../App.js';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Checkbox,FormControlLabel } from '@mui/material';
import {PostLike} from '../services/Apis'


import axios from 'axios';


export default function Like (props) {
       
        const [like,setLike] = useState({likeNumber : null,isLiked: null});

        const user = useContext(auth)
        
        const LocalURL = 'http://localhost:8080/';


       const data = () => {
       axios.post(LocalURL+'getLike',{uuid : props.uuid},{headers :{ 'Authorization' :`Token ${user.cerdential.token}`}})
       .then((data)=>{console.log(data); setLike({likeNumber:data.data.like,isLiked :data.data.isLiked}); })
        }
       
        return(
           <>
           {data()}
           <FormControlLabel
          value="end"
          control={<Checkbox sx={{marginLeft : '2px'}} size = 'small' checked = {like.isLiked !== null && like.isLiked}
            onChange={(e)=>{ setLike({...like, isLiked : e.target.checked});
             PostLike({uuid : data.uuid,like : e.target.checked},user);}}  
             icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: '#ff4949' }} />}/> }
          label={like.likeNumber !== null && like.likeNumber}
          labelPlacement="end"
        />
           </>
       )
    }
