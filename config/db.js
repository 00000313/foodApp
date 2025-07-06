const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const mongoUrl = process.env.mongoUrl
console.log("MONGO" , mongoUrl)

 async function connectDB(){


 await mongoose.connect(mongoUrl);
}

module.exports={
    connectDB,
}                                                               