const express = require("express");
const { testUserConntroller } = require("../controller/controller");
const authMiddleware = require("../middlewares/authMiddleware");
const router= express.Router();

router.get("/test-user",authMiddleware,testUserConntroller)

module.exports = router;