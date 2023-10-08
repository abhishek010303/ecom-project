import { Component } from "react"
import { Base_url } from "../Config/BaseURL";
import { useEffect,useState } from "react";
import axios from "axios";
import '../style/Home.css'
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home(){

const navigate=useNavigate()
    var [data ,setData]=useState([])
    function getProductData(){
        axios.get(Base_url+'/get-products').then((res_of_product)=>{
         
            let u_id = localStorage.getItem('auth_id')
            axios.get(Base_url+'/get-cart-count',{params: {u_id : u_id}}).then((res_of_cart)=>{
                let prod_arr=res_of_product.data.data;
                let cart_arr=res_of_cart.data.data;
              for(let i=0;i<prod_arr.length;i++)
              {
                for(let j=0;j<cart_arr.length;j++)
                {
                    if(prod_arr[i]._id==cart_arr[j].p_id){
                        prod_arr[i]['disable']=true
                    }
                }

              }
              console.log(prod_arr)
              setData(prod_arr)
            }).catch((err)=>{
                setData([])
            })

        }).catch((err)=>{
            setData([])
        })

    }
    useEffect(()=>{
        getProductData()
        },[])
        
        const handleviewmore=(item)=>{
            console.log(item)
            navigate(`/product/${item._id}`, {state:item})

        }
        const addtocart=(item)=>{
            console.log(item)
            var u_id=localStorage.getItem('auth_id')
            let data={
                u_id : u_id,
                p_id : item._id,
                quantity : 1
            }
            axios.post(Base_url+'/add-to-cart',data).then((res)=>{
                toast.success(res.data.message)
                window.location.reload()
            }).catch((error)=>{
                toast.error(error.response.data.message)
            })
        }




    return(<>{Array.isArray(data)&&data.length>0?
    <>
    {data.map((el,i)=>(
        <div class="card" style={{width: "18rem"}}>
        <img class="card-img-top" src={el.image} alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">{el.p_name}</h5>
          <p class="card-text"><span style={{color:"red" , fontWeight:"bold", fontSize:"25px"}}>{`-${el.discount}%`}</span><span><sup style={{fontWeight:"bold", fontSize:"18px",marginLeft:20 , marginRight:20}}>&#x20B9;{el.price-((el.discount/100)*el.price)}</sup></span></p>
          <p class="card-text"><p>M.R.P <span>&#x20B9;</span><del>{el.price}</del>  </p></p>
         
          <a  class="btn btn-primary" onClick={()=>{handleviewmore(el)}} style={{marginRight:10}}>view more</a>
          <button disabled={el.disable==true?true:false} onClick={()=>{addtocart(el)}}class="btn btn-success"style={{marginRight:10}}>{el.disable==true?"Already added":"Add to cart"}</button>
        </div>
      </div>

    ))}
    </>:null}
    </>
    )
}
   export default Home;