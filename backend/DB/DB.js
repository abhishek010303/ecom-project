const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DB-Aug')
const db = mongoose.connection;
db.on('error',function(){
    console.log("Error in connection with Mngo-DB")
})
db.once('open',function(){
    console.log("Successfully Connected with Mongo-DB")
})
module.exports=db