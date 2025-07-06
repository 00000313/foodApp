const express = require("express");
const { registerController ,loginController } = require("../controller/Auth Controller/authController");
const {resetPassword} = require("../controller/userController")
const router= express.Router();

//Register User Route
router.post("/",registerController);
router.post("/reset",resetPassword)

//For login
router.post("/login",loginController);
module.exports=router;