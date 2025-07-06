const mongoose = require('mongoose');

//shcema
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"User Name  is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password should be at least 6 characters long"], 
    },
    Address:{
        type:String,
        required:[true,"Address is required"]
    },
    Phone:{
        type:String,
        required:[true,"Phone number is required"],
    },
    userType:{
        type:String,
        default:"client",
        enum:["admin","client","vendor","driver"],

    },
    profile:{
        type:String,
        default:"client.jpg"
    },
    answer:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);