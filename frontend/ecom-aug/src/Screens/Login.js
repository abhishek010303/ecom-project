import '../style/login.css'
import { Link } from 'react-router-dom'
import { useState } from "react"
import { Base_url } from "../Config/BaseURL"
import axios from 'axios'
import {toast} from'react-toastify'









function Login(){
  const [values,setvalues]=useState({
  
    email:"",
    password:""
  })
  function handleInput(e){
   setvalues({...values,[e.target.name]:e.target.value})
  
  }
  
  function handleSubmit(){
   
    var reg_email=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
   
     if(!reg_email.test(values.email)||values.email===""){
      console.log("invalid")
      toast.error('please enter email id')
    }
    else if(values.password.trim().length<5){
      toast.error('minimum 6 character')
    }
    
    else{
     axios.post(Base_url+'/login-user',values).then((res)=>{
     console.log(res)
    toast.success(res.data.message)
     localStorage.setItem('auth_id',res.data.data._id)
     window.location.reload()
     }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
     })
  
    }
  }

    return(<>
       
        <div className="container">
        {/* <form> */}
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name='email' value={values.email} onChange={handleInput} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name='password' value={values.password} onChange={handleInput} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-group form-check">
   <h5>Don't have an account<Link to='/register'>Register here!</Link> </h5>
  </div>
  <button type="submit" onClick={handleSubmit} class="btn btn-primary">Login</button>
{/* </form> */}

        </div>










    </>


    )

}
export default Login