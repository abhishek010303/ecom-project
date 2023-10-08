import { useNavigate } from "react-router-dom"
import '../style/Badges.css'




function Navbar({countofcart}){

  function handlelogout(){
    localStorage.removeItem('auth_id')
    window.location.reload()
  }

const navigate=useNavigate()
return(
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class={`nav-item ${window.location.href.includes('/home')?'active':""}`} >
        <a class="nav-link" onClick={()=>{navigate('/home')}} style={{cursor:"pointer"}}>Home <span class="sr-only">(current)</span></a>
      </li>
      <li class={`nav-item ${window.location.href.includes('/about')?'active':""}`} >
        <a class="nav-link" onClick={()=>{navigate('/about')}}  style={{cursor:"pointer"}}>About <span class="sr-only">(current)</span></a>
      </li>
      <li class={`nav-item ${window.location.href.includes('/product')?'active':""}`} >
        <a class="nav-link" onClick={()=>{navigate('/product')}}  style={{cursor:"pointer"}}>Products <span class="sr-only">(current)</span></a>
      </li>
      <li class={`nav-item ${window.location.href.includes('/contact')?'active':""}`} >
        <a class="nav-link" onClick={()=>{navigate('/contact')}} style={{cursor:"pointer"}}>Contact <span class="sr-only">(current)</span></a>
      </li>
      
    </ul>
    <form class="form-inline my-2 my-lg-0">
   <div style={{marginRight: 20}}>
    <i onClick={()=>{navigate('/mycart')}} class="fa" style={{fontSize:"24px", cursor:"pointer"}}>&#xf07a;</i>
    <span class='badge badge-warning' id='lblCartCount'> {countofcart}</span></div> 
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <button class="btn btn-outline-success my-2 my-sm-0" onClick={handlelogout} style={{marginLeft:'4px'}} type="submit">Logout</button>
    </form>
  </div>
</nav>



)    
}
export default Navbar