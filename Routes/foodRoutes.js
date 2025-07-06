const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")
const {createFoodController , getAllFoods ,getFoodById , getByRestaurant ,updateFood , deleteFood , placeOrder ,orderStatusController} = require('../controller/foodController');
const router= express.Router();

router.post('/create',authMiddleware,createFoodController);
router.get('/getAll',authMiddleware,getAllFoods);
router.get('/getById/:id',authMiddleware,getFoodById);

router.get('/getByRestaurant/:restaurantId',authMiddleware,getByRestaurant);
router.put('/update/:id',authMiddleware,updateFood);
router.delete('/delete/:id',authMiddleware,deleteFood);
router.post('/placeorder',authMiddleware,placeOrder);
console.log("hiiiiiuuuqqwwrr")
//router.post("/orderStatus", adminMiddleware , orderStatusController);

module.exports = router;