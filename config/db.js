const mongoose = require('mongoose');

 async function connectDB(){


 await mongoose.connect("mongodb+srv://shahbaz:India%40123@cluster0.jkcibqg.mongodb.net/food-app");
}

module.exports={
    connectDB,
}                                                               