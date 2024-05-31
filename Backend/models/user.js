let mongoose = require('mongoose');
const { type } = require('os');

let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String, 
        unique : true,  //This is to make sure that the email entered by a user is unique and not already taken by someone else.
    },
    mobile:{
        type: String
    },
    address:{
        type: String,
        required: true
    },
    aadharCardNumber:{
        type: Number,
       
       
    },
    password :{
        type: String,
        required: true
    },
    role:{
        type: String,
        ENUM: ['admin', 'voter'],
        default: 'voter'
    },
    isVoted:{
        type: "Boolean",
        default: false
    }
    });


    let User = mongoose.model( 'User', userSchema );
    module.exports= User;