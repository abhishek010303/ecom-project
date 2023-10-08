import { Link } from "react-router-dom"
import '../style/login.css'
import { useState } from "react"
import { Base_url } from "../Config/BaseURL"
import axios from "axios"
import {toast} from'react-toastify'

function Register(){


const [values,setvalues]=useState({
    name:"",
    email:"",
    mobile:"",
    gender:"Male",
    address:"",
    password:""
})
function handleInput(e){
   setvalues({...values,[e.target.name]:e.target.value})

}
function handleSubmit(){
    var reg_mobile= /^[6-9]\d{9}$/;
    var reg_email=/[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if(values.name.trim()=="" || values.name.trim().length==1)
    {
      toast.error('Please Enter your name' )
    }
    else if(!reg_mobile.test(values.mobile)|| values.mobile==""){
      toast.error('Please enter mobile number')
    }
    else if(!reg_email.test(values.email)||values.email==""){
      toast.error('please enter email id')
    }
    else if(values.address.trim()=="" || values.address.trim().length==1){
      toast.error('please enter address')
    }
    else if(!values.gender){
      toast.error('please select gender')
    }
    else{
     axios.post(Base_url+'/add-user',values).then((res)=>{
     console.log(res)
     toast.success(res.data.message)
     }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.message)
     })

    }
}
function handlegengerselect(e){
setvalues({...values,['gender']:e.target.value})
}
    return(
        <>
       
        <div className="container">
        
        <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text"  name="name" class="form-control"onChange={handleInput} id="exampleInputEmail1" placeholder="Enter your name"/>
    </div>
    
  <div class="form-group">
    <label for="exampleInputEmail1">Email </label>
    <input type="email" class="form-control" name="email" onChange={handleInput} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Address</label>
    <input type="text" class="form-control" name="address" onChange={handleInput} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Address"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Mobile</label>
    <input type="number" name="mobile" class="form-control"onChange={handleInput} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter mobile number"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Gender</label>
    <select onChange={handlegengerselect} class="form-control">
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="text" name="password"class="form-control" onChange={handleInput} id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-group form-check">
   <h5>Already have an account<Link to='/login'>Login here!</Link> </h5>
  </div>
  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>


        </div>










    </>
    )
}
export default Register