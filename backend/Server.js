const express = require('express');
const app= express();
const PORT=8000
const cors= require('cors')
const db = require('./DB/DB')
const Myroutes=require('./Routes/Routes')
const bodyParser= require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/',Myroutes)



app.listen(PORT, ()=>{
   
    console.log(`server is running at ${PORT}`)
})
