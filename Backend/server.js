const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")

//db
const db = require('./config/key').mongoURL;
const port = process.env.PORT || 8000;

// const bodyParser = require('body-parser'); 
// app.use(bodyParser.json()); // req.body

mongoose.connect(db, {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=> console.log("connected..."))
.catch(err=>console.log("mongo"+err));





app.use(cors());

// app.use(express.static(__dirname + '/views'));
// app.set('view engine', 'ejs');

//Bodypraser
// app.use(express.json()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//route
app.use('/user', require('./routes/user'));
app.use('/candidate', require('./routes/candidate'));
app.get("/",(req,res)=>{
    res.send("HI")
})



  
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})