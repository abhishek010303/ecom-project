const mongoose = require('mongoose');
const Userschema= new mongoose.Schema({
    name:{
        type : String,
        required :true
    },
    email:{
        type : String,
        required :true,
        unique:true
    },
    gender:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
       unique :true
    }
})
const User= mongoose.model('users', Userschema);
module.exports=User;