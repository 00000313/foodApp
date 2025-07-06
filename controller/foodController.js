const foodModel = require('../Models/foodModel')
const OrderModel = require('../Models/orderModel')

const createFoodController = async (req,res)=>{
    try{
    console.log("DKJlfjklsdjf")
      const {title , description , price , imageUrl , foodTags , category , code , isAvailable , restaurant , rating , ratingCount } = req.body;
      console.log(title, description, price, imageUrl, foodTags, category,code, isAvailable, restaurant , rating, ratingCount);

     if(!title || !description || !foodTags || !restaurant){
         return res.status(500).send({
            success:false,
            message:"Please provide all necessary feilds"
         })
     }

     const newFood= new foodModel({
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount
     })
     await newFood.save();
     return res.status(201).send({
        success:true,
        message:"New Food Item created successfully",
        data:newFood
     })

    }catch(err){
       console.log("Error",err);
       return res.status(500).send({
        success:false,
        message:"Error in creating food api",
        "error" :err
       })
    }
}



const getAllFoods= async (req,res) => {
    try{
        console.log("Getting all foods")
        const foods= await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No food items found",
             });
            }
            else{
                return res.status(200).send({
                    success:true,
                    message:"All Food Items fetched successfully",
                    data:foods
                })
            }
    }catch(err){
        console.log("Error",err);
        return res.status(500).send({
            success:false,
            message:"Error in getting all foods api",
            "error":err
        })
    }
}

const getFoodById= async (req,res) => {
    try{
        console.log("Getting food by id")
        const food= await foodModel.findById(req.params.id);
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food item not found",
             });
            }
            else{
                return res.status(200).send({
                    success:true,
                    message:"Food Item fetched successfully",
                    data:food
                })
            }
    }catch(err){
        console.log("Error",err);
        return res.status(500).send({
            success:false,
            message:"Error in getting food by id api",
            "error":err
        })
    }
}

const getByRestaurant=async (req, res) => {
    try{
        console.log("Getting food by restaurant")
        const foods= await foodModel.find({restaurant:req.params.restaurantId});
        console.log(foods)
        if(!foods){
            return res.status(404).send({
                success: false,
                message: "No food items found for this restaurant",
             });
            }
            else{
                return res.status(200).send({
                    success:true,
                    message:"Food Items fetched successfully for this restaurant",
                    data:foods
                })
            }
    }catch(err){
        console.log("Error",err);
        return res.status(500).send({
            success:false,
            message:"Error in getting food by restaurant id api",
            "error":err
        })
    }
}

const updateFood= async (req,res) => {
    try{
        console.log("Updating food")
        const food= await foodModel.findById(req.params.id);
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food item not found",
             });
            }
            else{
                const {title , description , price, imageUrl, foodTags , category , code , isAvailable , restaurant , rating} = req.body;
          console.log(title, description, price, imageUrl, foodTags, category, code , isAvailable, restaurant, rating)

          const updatedfood =await foodModel.findByIdAndUpdate(food.id ,{
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
          },{new: true});
                return res.status(200).send({
                    success:true,
                    message:"Food Item updated successfully",
                    data:updatedfood
                })
            }
    }catch(err){
        console.log("Error",err);
        return res.status(500).send({
            success:false,
            message:"Error in updating food api",
            "error":err
        })
    }
}

const deleteFood= async (req,res) => {
    try{
        console.log("Deleting food")
        const food= await foodModel.findByIdAndDelete(req.params.id);
        if(!food){
            return res.status(404).send({
                success: false,
                message: "Food item not found",
             });
            }
            else{
                return res.status(200).send({
                    success:true,
                    message:"Food Item deleted successfully",
                    data:food
                })
            }
    }catch(err){
        console.log("Error",err);
        return res.status(500).send({
            success:false,
            message:"Error in deleting food api",
            "error":err
        })
    }
 
}

const placeOrder=async (req, res)=>{
    try{
        console.log("Placing Order")
        let total= 0;
        const { cart } = req.body;
        if(!cart ){
            res.status(500).send({
                success: false,
                message:"Please provide food cart  and payment"
         })
        }
        //cal 
        cart.map((i)=>{
            total += parseInt(i.price,10);
        })
        console.log(total)
        const newOrder= new OrderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await newOrder.save();
        res.status(201).send({
            success:true,
            message:"Order placed successfully",
            data:newOrder,
            total:total
      })
    }catch(error){
        console.log("Error",error);
        return res.status(201).send({
            success:true,
            message:"Order placed successfully",
        })
    }
        
}
module.exports = {
    createFoodController,
    getAllFoods,
    getFoodById,
    getByRestaurant,
    updateFood,
    deleteFood,
    placeOrder
 
}