const express = require('express');const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const  {createReateurant , getAllRestaurants , getRestaurantById ,deleteRestaurant} = require("../controller/resteurantController");

router.post("/createRestaurant",authMiddleware,createReateurant)
router.get("/getAll",authMiddleware,getAllRestaurants)
router.get("/getById/:id",authMiddleware,getRestaurantById)
router.delete("/deleteById/:id",authMiddleware,deleteRestaurant)


module.exports=router;
