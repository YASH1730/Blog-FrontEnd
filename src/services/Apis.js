import axios from 'axios';


const LocalURL = 'http://localhost:8080/';




// register api
export const Register =  async(data,setValidation,validation,setAlert) =>{
    await axios.post(LocalURL+'register',data)
    
    .then((res)=>{
        // console.log(res);

        if(res.status === 200)
        { 
            setAlert('success')
            setValidation({...validation,alert : true,massage : res.data.massage})
        }
        else
        {
            setAlert('error')
            return setValidation({...validation,alert : true,massage : res.data.massage})
        }
    })
    
        .catch((err)=>{console.log(err,data); })

}

// login api
export const Login =  async(data,setValidation,validation,setAlert,user) =>{

  await axios.post(LocalURL+'login',data)
    
    .then((res)=>{
        console.log(res);
        if(res.status === 200)
        { 
            setAlert('success')
            user.setCred({token : res.data.token,userName : res.data.name,email : res.data.email})
            localStorage.setItem('token' , res.data.token)
            localStorage.setItem('name' , res.data.name)
            localStorage.setItem('email' , res.data.email)
            (setValidation({...validation,alert : true,massage : res.data.massage}))
            
        }
        else
        {
            setAlert('error')
            return setValidation({...validation,alert : true,massage : res.data.massage})     
        }
    })
    
        .catch((err)=>{console.log(err,data); })

}

// blog api

export const AddBlog =  async(data,setValidation,setAlert,user) =>{
  console.log(setAlert)

  await axios.post(LocalURL+'createblog',data,{headers :{ 'Authorization' :`Token ${user.cerdential.token}`}})
    .then((res)=>{
        console.log(res);
        if(res.status === 200)
        { 
            setAlert('success')
            (setValidation({alert : true,massage : res.data.massage}))
            
        }
        else
        {
            setAlert('error')
            return setValidation({alert : true,massage : res.data.massage})     
        }
    })
    
        .catch((err)=>{console.log(err,data); })

}

// Get blog api for dashboard

export const GetBlog =  async(user) =>{
   return await axios.get(LocalURL+'getblog',{headers :{ 'Authorization' :`Token ${user.cerdential.token}`}})
}

// Get blog api for home 

export const GetBlogHome =  async() =>{
   return await axios.get(LocalURL+'getBlogHome')
}


// post blog api for comment 

export const PostComment =  async(data,setValidation,setAlert,user) =>{
    await axios.post(LocalURL+'postComment',data,{headers :{ 'Authorization' :`Token ${user.cerdential.token}`}})
    .then((res)=>{
        console.log(res);
        if(res.status === 200)
        { 
            setAlert('success')
            (setValidation({alert : true,massage : res.data.massage}))
            
        }
        else
        {
            setAlert('error')
            return setValidation({alert : true,massage : res.data.massage})     
        }
    })
    
        .catch((err)=>{console.log(err,data); })
}

// Post api for comment 

export const PostLike =  async(data,user) =>{
    await axios.post(LocalURL+'postLike',data,{headers :{ 'Authorization' :`Token ${user.cerdential.token}`}})
    .then((res)=>{
        console.log(res);
        if(res.status === 200)
        { 
          console.log(data)
        }
    })
    
        .catch((err)=>{console.log(err,data); })
}

// Get blog api for home 

export const GetLike =  async(data) =>{
    return await axios.post(LocalURL+'getLike',data)
}