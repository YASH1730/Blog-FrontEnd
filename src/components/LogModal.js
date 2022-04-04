import React,{useContext,useState} from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fade from '@material-ui/core/Fade';
import { Grid, TextField ,} from '@material-ui/core'
import {setModal,auth,trackCard} from '../App.js';
import Alert from '@mui/material/Alert';
import {Register,Login,AddBlog,PostComment} from '../services/Apis'


 

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LogModal() {

  
  const button = {marginTop : '10px',backgroundColor : '#596d6e',align : 'center' }
  

  // validation helper state 
  const [alertType,setAlert] = useState('error')
  const [validation , setValidation] = useState({
    email : false,
    phoneNumber : false,
    rePassword : false,
    password : '',
    fullName : '',
    alert : false,
    massage : ''

  })



  const Modalval  = useContext(setModal);
  const user  = useContext(auth);
  const tracker  = useContext(trackCard);

  const handalClose = ()=>{
    setValidation({
      email : false,
      phoneNumber : false,
      rePassword : false,
      alert : false,
      password : '',
    fullName : '',
      massage : ''
    })
    Modalval.toogleModal(false)
  }

  // handel change 

  const handalChange = (e)=>{

    // console.log(e.target.name)

    const checkVal = e.target.name;

    // regex 
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    
    const phoneRegex = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);

    switch (checkVal) {
      case 'fullName':
        break;
      case 'email':
        validEmailRegex.test(e.target.value) ? setValidation({...validation,email : false}) : setValidation({...validation,email : true});
        break;
      case 'password':
        setValidation({...validation,password : e.target.value})
        break;
      case 'repassword':
        validation.password === e.target.value ? setValidation({...validation,rePassword : false}) : setValidation({...validation,rePassword : true}); 
        break;
      case 'phoneNumber':
        phoneRegex.test(e.target.value) ? setValidation({...validation,phoneNumber : false}) : setValidation({...validation,phoneNumber : true});
        break;
    
      default:
        break;
    }

  }

  // handel submit

  /// submit check ====

  const lastCheckEnroll = (formProps)=>{
    console.log(formProps)
    for (const key in validation) {
      if (Object.hasOwnProperty.call(validation, key)) {
        if(validation[key] === true && key !== 'alert')
        {
          console.log('Alert')
          return (setValidation({...validation,alert : true,massage : "Please resolve all erros !!!"}))
        }
        else if(formProps[key] === undefined && key !== 'alert' &&  key !== 'massage' ){
          console.log(key)
          return (setValidation({...validation,alert : true,massage : "Please fill up all the feilds !!!"}))
        }
        
      }
    }
    setValidation({...validation,alert : false})
    Register(formProps,setValidation,validation,setAlert)
    Login(formProps,setValidation,validation,setAlert,user)
    handalClose()


  }

  /// login check ====
  const lastCheckLogin = (formProps)=>{
    for (const key in formProps) {
      if (Object.hasOwnProperty.call(formProps, key)) {
        if(formProps[key] === undefined){
          return (setValidation({...validation,alert : true,massage : "Please fill up all the feilds !!!"}))
        }
      }
    }
    setValidation({...validation,alert : false})
    Login(formProps,setValidation,validation,setAlert,user)
    handalClose()
  }

  const handelSubmit = (e)=>{
    e.preventDefault()
    
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if(Modalval.formType === 'logIn')
    {
      return lastCheckLogin(formProps)
    }
    else if (Modalval.formType === 'blog'){
      // console.log(formProps)
        handalClose()
        AddBlog(formProps,setValidation,setAlert,user)
    }
    else if(Modalval.formType === 'comment'){
      console.log(formProps,tracker.tracker.uuid)
      formProps.uuid = tracker.tracker.uuid;
      PostComment(formProps,setValidation,setAlert,user);
    }
    else
    { 
      return lastCheckEnroll(formProps)
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={Modalval.stateModal}
        onClose={handalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Modalval.stateModal}>
          <Box sx={style}>
          
          {/* // Modal For Log In */}
          {
            Modalval.formType === 'logIn' && 
            <>
            {validation.alert && <Alert onClick={()=> {console.log('asdasd'); setValidation({...validation,alert : false})}} variant="outlined" severity={alertType}>
                {validation.massage}
                 </Alert>}
              <Grid>

                <Grid align='center'>
                
                <Typography mt={1} variant="h5" display="block" gutterBottom  >  Log In </Typography>

                </Grid>
                    <form onSubmit = {handelSubmit} method="post">
                        <TextField onChange={handalChange} autoComplete='off'  fullWidth name = 'email' error = {validation.email}  helperText={validation.email && "Incorrect email !!"}  label='Email' placeholder="Enter your email" />
                        
                        <TextField onChange={handalChange} fullWidth label='Password'  name = 'password' type = 'password' placeholder="Enter your password"/>
                      <Grid container justifyContent = 'center' > 
                        <Button style = {button} size = 'small' type='submit' variant='contained'  color='primary'>Log In</Button> 
                        </Grid>
                        
                      <Grid container  justifyContent = 'center' > 
                        <Typography mt={1} variant="caption" display="block" gutterBottom  color = '#787878a8'>  Forgot Your Password </Typography>
                        </Grid>

                      <Grid container justifyContent = 'center' textAlign = 'center' > 
                        <Typography > Do not have an account ? Register </Typography>
                      </Grid>

                    </form>
            </Grid>
          </>
          }


          {/* // Modal For EnRoll */}
          {
              Modalval.formType === 'enRoll' && 
                <>
               {validation.alert && <Alert onClick={()=> {console.log('asdasd'); setValidation({...validation,alert : false})}} variant="outlined" severity={alertType}>
                {validation.massage}
                 </Alert>}
                   <Grid>

                      <Grid align='center'>

                      <Typography mt={1} variant="h5" display="block" gutterBottom  >  Enroll </Typography>

                      </Grid>
                          <form onSubmit = {handelSubmit} method="post">
                              <TextField  onChange={handalChange} fullWidth name = 'fullName' label='Full Name' placeholder= "Full Name" />
                              
                              <TextField error = {validation.email}  helperText={validation.email && "Incorrect email !!"} onChange={handalChange} fullWidth name = 'email' label='Email' placeholder="Email" />
                              
                              <TextField error = {validation.phoneNumber}  helperText={validation.phoneNumber && "Incorrect Phone Number !!"} onChange={handalChange} fullWidth name = 'phoneNumber' label='Phone Number' placeholder="Phone Number" />
                              
                              <TextField onChange={handalChange} fullWidth type = 'password' name = 'password' label='Password' placeholder="Password"/>
                              
                              <TextField error = {validation.rePassword}  helperText={validation.rePassword && "Password doesn't match !!"} onChange={handalChange} fullWidth name = 'rePassword' label='Confirm Password' placeholder="Confirm Password"/>
                            
                            <Grid container justifyContent = 'center' > 
                              <Button style = {button} size = 'small' type='submit' variant='contained' color='primary'>Enroll</Button> 
                            </Grid>
                              
                            <Grid container justifyContent = 'center' textAlign = 'center' > 
                              <Typography mt = {1} > I Do have an account !!! Log In </Typography>
                            </Grid>

                          </form>
                      </Grid>
                </>
          }

          {/* // Modal For Comment */}
          {
              Modalval.formType === 'comment' && 
              <>
               {validation.alert && <Alert onClick={()=> {console.log('asdasd'); setValidation({...validation,alert : false})}} variant="outlined" severity={alertType}>
                {validation.massage}
                 </Alert>}
              <Grid>

                <Grid align='center'>
                
                <Typography mt={1} variant="h5" display="block" gutterBottom  > Comment </Typography>

                </Grid>
                    <form  onSubmit = {handelSubmit} method='post'>
                        <TextField fullWidth label='Write a comment here !!!' required="required" name  = 'comment' placeholder="Enter your email" />
                        
                        
                      <Grid container justifyContent = 'center' > 
                        <Button style = {button} size = 'small' type='submit'  variant='contained' color='primary'>Comment</Button> 
                        </Grid>
                        

                    </form>
            </Grid>
          </>
          }

          {/* // Modal For Blog Writing */}
          {
              Modalval.formType === 'blog' && 
              <>
               {validation.alert && <Alert onClick={()=> {console.log('asdasd'); setValidation({...validation,alert : false})}} variant="outlined" severity={alertType}>
                {validation.massage}
                 </Alert>}
              <Grid>

                <Grid align='center'>
                
                <Typography mt={1} variant="h5" display="block" gutterBottom  > Create Blog </Typography>

                </Grid>
                    <form onSubmit={handelSubmit} method='post'>
                        <TextField fullWidth required="required" name = 'title' label='Title' placeholder="Title" />
                        <TextField fullWidth required="required" type = 'url' name = 'image' label='Image Link' placeholder="Imgae Link" />
                        <TextField fullWidth required="required" name = 'descripition' multiline rows={7} label='Blog' placeholder="Write Here !!!" />
                        
                        
                      <Grid container justifyContent = 'center' > 
                        <Button style = {button} size = 'small' type='submit' variant='contained' color='primary'>Create</Button> 
                        </Grid>
                        

                    </form>
            </Grid>
          </>
          }
          
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
