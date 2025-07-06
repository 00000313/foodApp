const express = require("express");
const {
  getUserController,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getUser/:id", authMiddleware, getUserController);
router.post("/updateUser", authMiddleware, updateUser);
router.post("/changePassword", authMiddleware, updatePassword);
router.delete("/deleteUser/:id", authMiddleware, deleteUser);

module.exports = router;
