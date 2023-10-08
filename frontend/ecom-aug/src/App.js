import { useEffect, useState } from "react";
import CombineRouting from "./Routing/CombineRouting";
import axios from "axios";
import { Base_url } from "./Config/BaseURL";



function App() {
    const [cartcount,setcartcount]=useState(0)
function getcartcount(){
    let u_id = localStorage.getItem('auth_id')
    axios.get(Base_url+'/get-cart-count',{params: {u_id : u_id}}).then((res)=>{
        console.log(res.data)
        setcartcount(res.data.count)
        localStorage.setItem('count',res.data.count)


    }).catch((err)=>{
        setcartcount(0)
    })
    
}
useEffect(()=>{
    getcartcount()
},[])
return(
  
<CombineRouting countofcart = {cartcount}/>
)

}
export default App;
