import{Routes,Route,Link} from 'react-router-dom'
import Contact from '../Screens/Contact'
import Products from '../Screens/Products'
import About from '../Screens/About'
import Home from '../Screens/Home'
import Navbar from '../Layout/Navbar'
import ViewProduct from '../Screens/ViewProduct.js'
import Cart from '../Screens/Cart'



const AllRouting =({countofcart})=>{
    return(<>
        <Navbar countofcart={countofcart}/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/product' element={<Products/>}/>
            <Route path='/mycart' element={<Cart/>}/>
            <Route path='/product/:id' element={<ViewProduct/>}/>
            <Route path='*' element={<Home/>}/>
            
        </Routes>

        </>
    )
    }
export default AllRouting