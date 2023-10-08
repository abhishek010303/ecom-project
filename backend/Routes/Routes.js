const express = require('express')
const router = express.Router()
const Mycontroller=require('../Controllers/controller')

router.get('/',Mycontroller.getapi)
router.post('/add-user',Mycontroller.Registeruser)
router.post('/login-user',Mycontroller.loginuser)
router.post('/add-product',Mycontroller.addproducts)
router.get('/get-products',Mycontroller.Allproduct)
router.post('/add-to-cart',Mycontroller.addtocart)
router.get('/get-cart-count',Mycontroller.getcartCountByUserID)
router.get('/get-cart-with-products',Mycontroller.getCartProducts)
router.post('/update-cart-quantity',Mycontroller.UpdateCartQuantity)
router.get('/remove-cart-item',Mycontroller.RemoveItemfromCart)


module.exports=router