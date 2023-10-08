const Userschema = require("../Schemas/UserSchemas")
const ProductSchema= require("../Schemas/ProductSchema");
const CartSchema=require("../Schemas/CartSchema")

const bcrypt = require("bcrypt");

exports.getapi = (req, res) => {
  if (req.query.number % 2 == 0) {
    return res.send(`<h1> Hi || ${req.query.number} is even number</h1>`);
  } else {
    return res.send(`<h1> Hi || ${req.query.number} is odd number</h1>`);
  }
};
exports.loginuser=(req,res)=>{
    const{ email,password}=req.body
    Userschema.find({email:email}).then((result)=>{
        console.log(result)
    if(result.length>0)
        {
                  bcrypt.compare(password,result[0].password,function(err,status){
                    if(err)
                    {
                        return res.status(500).send({status: 500,message:"somethin[g went wrong||try again"})
                    }
                    else
                    {
                        if(status==true)
                        {
                            return res.status(200).send({status:200,message:"login successfully" , data: result[0]})
                            
                        }
                        else{
                            return res.status(400).send({status: 400,message:"Incorrect password"})
                        }

                    }
                  })
        }
        else{
            return res
            .status(500)
            .send({ status: 500, message: "user not found" })
        }
}).catch((err)=>{
    return res
    .status(400)
    .send({ status: 400, message: "something went wrong||try again" })
})
}

exports.Registeruser = (req, res) => {
  const { name, email, mobile, password, gender, address } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res
        .status(400)
        .send({ status: 400, message: "somethinng went wrong||try again" });
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          return res
            .status(400)
            .send({ status: 400, message: "somethinng went wrong||try again" });
        } else {
          Userschema.insertMany({
            name: name,
            address: address,
            password: hash,
            mobile: mobile,
            email: email,
            gender: gender,
          }).then((result) =>{
              console.log(result);
              if (result.length > 0) {
                return res.status(200).send({
                    status: 200,
                    message: "user successfully registered",
                  });
              } else {
                return res.status(400).send({
                    status: 400,
                    message: "somethinng went wrong||try again",
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              if ((err.name = "ValidationError")) {
               return  res.status(400).send({
                    status: 400,
                    message: `${err.message.split("Path")[1]}`,
                  });
              } else if (
                (err.name = "MOngoBulkWriteEroor" && err.code == 11000)
              ) {
                return res.status(400).send({
                    status: 400,
                    message: `User already exist${err.message
                      .split("{")[1]
                      .replace("}", "")}`,
                  });
              } else {
                 
                return  res.status(500).send({
                  status: 500,
                  message: "somethinng went wrong||try again",
                });
                  
              }
            
            });
        }
      });
    }
  });
};
exports.RemoveItemfromCart=(req,res)=>{
  const {c_id}=req.query
  CartSchema.deleteOne({_id:c_id}).then((data3)=>{
    if(data3.deletedCount==1){
return res.status(200).send({status:200,message:"product remove successfully"})

    }else{
return res.status(500).send({status:500,message:"unable to remove product|| please try again"})

    }
  }).catch((err)=>{
return res.status(500).send({status:500,message:"Product not added into cart|| please try again"})

  })
}
exports.UpdateCartQuantity=(req,res)=>{
  const {c_id,type}=req.body;
  CartSchema.find({_id:c_id}).then((data1)=>{
    if(data1.length>0){
      if(type=="INCRE"){
    CartSchema.updateOne({_id:c_id},{$set :{quantity: data1[0].quantity+1}}).then((data2)=>{
      if(data2.modifiedCount==1){
        return res.status(200).send({status:200,message:"Updated successfully"})
    
        }
        else{
        return res.status(400).send({status:400,message:"Not updated|| please try again"})
    
        }
   
    }).catch((err)=>{
    return res.status(400).send({status:400,message:"Product not added into cart|| please try again"})

    }
    )}
    else{
      if(data1[0].quantity>1 && type=="DECRE"){
      CartSchema.updateOne({_id:c_id},{$set :{quantity: data1[0].quantity-1}}).then((data3)=>{
        
        if(data3.modifiedCount==1){
        return res.status(200).send({status:200,message:"Updated successfully"})
    
        }
        else{
        return res.status(400).send({status:400,message:"Not updated|| please try again"})
    
        }
        }).catch((err)=>{
        return res.status(500).send({status:500,message:"Product not added into cart|| please try again"})
    
        }
        )}
        else{
          CartSchema.deleteOne({_id:c_id}).then((data3)=>{
            if(data3.deletedCount==1){
    return res.status(200).send({status:200,message:"product remove successfully"})

            }else{
    return res.status(500).send({status:500,message:"unable to remove product|| please try again"})

            }
          }).catch((err)=>{
    return res.status(500).send({status:500,message:"Product not added into cart|| please try again"})

          })
  

        }
    }
    }
    else{
    return res.status(400).send({status:400,message:"Product not added into cart|| please try again"})

    }

  }).catch((err)=>{
  return res.status(500).send({status:500,message:"Something went wrong|| please try again"})

  })
}

exports.addtocart=(req,res)=>{

const {u_id, p_id, quantity}=req.body;
CartSchema.insertMany({u_id : u_id , p_id : p_id , quantity : quantity}).then((result)=>{
  if(result.length>0)
  {
    return res.status(200).send({status:200,message:"Product added into cart"})
  
  }
  else{
    return res.status(200).send({status:200,message:"Product added into cart"})
    return res.status(400).send({status:400,message:"Product not added into cart|| please try again"})

  }
}).catch((err)=>{
  return res.status(500).send({status:500,message:"Something went wrong|| please try again"})

})

}

async function getProductFromID(id){
  var pd =await ProductSchema.find({_id:id});
  console.log("PD",pd)

return pd[0]
}

exports.getCartProducts=(req,res)=>{
const {u_id}=req.query;
  CartSchema.find({u_id:u_id}).then((c_result)=>{
    var cart_arr=c_result;
    console.log(cart_arr.length)
    if (cart_arr.length>0){


      ProductSchema.find({}).then((pr_res)=>{
        var new_data=[]
        if(pr_res.length>0)
        {
          for(let i=0;i<c_result.length;i++)
          {
            for(let j=0;j<pr_res.length;j++)
            {
                 if(c_result[i].p_id==pr_res[j]._id)
              {
                new_data.push({...c_result[i]._doc,pro_data:pr_res[j]})
                console.log(new_data)
              }
            }
          }

          res.status(200).send({status:200,data:new_data, count: cart_arr.length ,message:"cart-product"})

        }
      })

    }else{
      return res.status(200).send({status:200,data:[], count: 0 ,message:"Something went wrong"})
  
    }
  }).catch((err)=>{
    return res.status(500).send({status:500,message:"Something went wrong|| please try again"})
    
  })
  }





exports.getcartCountByUserID=(req,res)=>{
  const {u_id}=req.query;
CartSchema.find({u_id:u_id}).then((result)=>{
  console.log(result.length)
  if (result.length>0){
    return res.status(200).send({status:200, data:result, count: result.length ,message:"Product added into cart"})
    
  }else{
    return res.status(200).send({status:200,data:result, count: result.length ,message:"Something went wrong"})

  }
}).catch((err)=>{
  return res.status(500).send({status:500,message:"Something went wrong|| please try again"})
  
})
}


exports.addproducts=(req,res)=>{
    const{p_name,price,image,category,discount}=req.body;
    ProductSchema.insertMany({p_name:p_name,image:image,discount:discount,category:category,price:price}).then((result)=>
    {
        if(result.length>0){
            return res.status(200).send({status:200,message:"product added successfully"})
        }
        else
        {
            return res.status(400).send({status:400,message:"product not added||try again"})
        }
    }).catch((err)=>{
        return res.status(500).send({status:500,message:"product not added||try again"})
    })
}
exports.Allproduct=(req,res)=>{
    ProductSchema.find({}).then((result)=>{
        return res.status(200).send({status:200,data:result})
    }).catch((err)=>{
        return res.status(500).send({status:500,data:[]})
    })
}