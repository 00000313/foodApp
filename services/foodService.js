

class FoodService{

    createFood(title , description , price , imageUrl , foodTags , category , code , isAvailable , restaurant , rating , ratingCount){
        try{
            console.log("DKJlfjklsdjf")
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


}

module.exports=new FoodService;