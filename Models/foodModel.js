const mongoose=require('mongoose');

const foodSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Food Title is required"],
    },
    description:{
        type:String,
        required:[true,"Food Description is required"],
    },
    price:{
        type:Number,
        required:[true,"Food Price is required"],
    },
    imageUrl:{
        type:String,
        default:"sldkjfkj"
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String
    },
    isAvailabe:{
        type:Boolean,
        default:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resteurant",
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5,
    },
    ratingCount:{
       type:String,
    },
},{timestamps:true});

module.exports=mongoose.model("Foods",foodSchema);