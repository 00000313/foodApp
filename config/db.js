const mongoose = require('mongoose');

 async function connectDB(){


 await mongoose.connect("mongodb://localhost:27017/food-app");
}

module.exports={
    connectDB,
}                                                               