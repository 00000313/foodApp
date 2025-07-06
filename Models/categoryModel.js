const mongoose = require('mongoose');

//shcema
const categorySchema= new mongoose.Schema({
 title:{
    type:String,
    required:[true,"Category title  is required"]
 },
 imageUrl:{
    type:String,
    required:[true,"Image Url is required"]
 },},
 {timestamps:true},
)

module.exports=mongoose.model("Category",categorySchema);