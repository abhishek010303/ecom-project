
import { useState,useEffect } from "react"
import {toast} from 'react-toastify'
import axios from "axios";
import { Base_url } from "../Config/BaseURL"

function Cart(){
    const [data,setcartData]=useState(0)
    
    function getcartcount(){
        let u_id = localStorage.getItem('auth_id')
        axios.get(Base_url+'/get-cart-with-products',{params: {u_id : u_id}}).then((res)=>{
            console.log(res.data.data)
            setcartData(res.data.data) 
            }).catch((err)=>{
            setcartData([])
        })
        
    }
    useEffect(()=>{
        getcartcount()
    },[])
    const incre=(item)=>{
        axios.post(Base_url+'/update-cart-quantity',{c_id:item._id, type:"INCRE"}).then((res)=>{
            toast.success(res.data.message)
            window.location.reload()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }


    const decre=(item)=>{
        axios.post(Base_url+'/update-cart-quantity',{c_id:item._id, type:"DECRE"}).then((res)=>{
            toast.success(res.data.message)
            window.location.reload()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    const remove=(item)=>{
        axios.get(Base_url+'/remove-cart-item',{params: {c_id:item._id}}).then((res)=>{
            toast.success(res.data.message)
            window.location.reload()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }





return(


<>{Array.isArray(data)&&data.length>0?
    <>
    {data.map((el,i)=>(
        <div class="card" style={{width: "18rem"}}>
        <img class="card-img-top" src={el.pro_data.image} alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">{el.pro_data.p_name}</h5>
          <p class="card-text"><span style={{color:"red" , fontWeight:"bold", fontSize:"25px"}}>{`-${el.pro_data.discount}%`}</span><span><sup style={{fontWeight:"bold", fontSize:"18px",marginLeft:20 , marginRight:20}}>&#x20B9;{el.pro_data.price-((el.pro_data.discount/100)*el.pro_data.price)}</sup></span></p>
          <p class="card-text"><p>M.R.P <span>&#x20B9;</span><del>{el.pro_data.price}</del>  </p></p>
          <button onClick={()=>{decre(el)}} class="btn btn-danger">-</button>
          <input  value={el.quantity} style={{textAlign:"center", width:"50px",height:"37px",margin:"2px"}}disabled={true}></input>
          <button onClick={()=>{incre(el)}} class="btn btn-success">+</button>
{/*          
          <a  class="btn btn-primary" onClick={()=>{handleviewmore(el)}} style={{marginRight:10}}>view more</a>
          <button disabled={el.disable==true?true:false} onClick={()=>{addtocart(el)}}class="btn btn-success"style={{marginRight:10}}>{el.disable==true?"Already added":"Add to cart"}</button> */}
        </div>
        <button onClick={()=>{remove(el)}} class="btn btn-danger" style={{margin:"8px"}}>Remove item</button>
      </div>

    ))}
    </>:null}
    </>






)

}
export default Cart;