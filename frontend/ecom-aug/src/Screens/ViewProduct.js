import { useLocation } from "react-router-dom"

function ViewProduct(){
const {state}=useLocation()
console.log(state)

return<>
 <div class="card" style={{width: "18rem"}}>
        <img class="card-img-top" src={state.image} alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">{state.p_name}</h5>
          <p class="card-text"><span style={{color:"red" , fontWeight:"bold", fontSize:"25px"}}>{`-${state.discount}%`}</span><span><sup style={{fontWeight:"bold", fontSize:"18px",marginLeft:20 , marginRight:20}}>&#x20B9;{state.price-((state.discount/100)*state.price)}</sup></span></p>
          <p class="card-text"><p>M.R.P <span>&#x20B9;</span><del>{state.price}</del>  </p></p>
         
          
          <a class="btn btn-success"style={{marginRight:10}}>Add to cart</a>
        </div>
      </div>


</>

}
export default ViewProduct