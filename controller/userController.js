const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const userService = require("../services/userService");

const getUserController = async (req, res) => {
  try {
    console.log("Get user rnning...");
    const { id } = req.params;
    console.log(id);
    const user = await userService.getUser(id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (e) {
    console.log("Error in get user API", e);
    return res.status(500).send({
      success: false,
      message: "Error in get user API",
      error: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("Update user rnning...");
    const { id, userName, phone, address } = req.body;
    const updateUser = await userService.updateUser(
      id,
      userName,
      phone,
      address
    );
    if (!updateUser) {
      return res.status(400).send({
        success: false,
        message: "User not updated successfully",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in update  user  API",
      err,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    console.log("newPass", newPassword, email);
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this email",
      });
    }
    console.log("User", user);
    console.log(user.answer, answer);
    // validate answer
    if (user.answer !== answer) {
      return res.status(401).send({
        success: false,
        message: "Incorrect answer",
      });
    }
    // update password
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch) {
      return res.status(400).send({
        success: false,
        message: "Password should not be same as old password",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in reset password API",
    });
  }
};

const updatePassword = async (req, res) => {
  console.log("Change  password is running");
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).send({
      success: false,
      message: "Old password and new password are required",
    });
  }
  const id = req.body.id;
  const user = await userModel.findById(id);
  console.log(user);
  const isMatch = await bcrypt.compare(newPassword, user.password);
  if (isMatch) {
    return res.status(400).send({
      success: false,
      message: "New password  should  not be same  as old password",
    });
  }
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(newPassword, salt);
  user.password = hash;
  await user.save();
  return res.status(200).send({
    success: true,
    message: "Password changed successfully",
  });
};

const deleteUser = async (req, res) => {
  try {
    console.log("Delete  user is  running");
    const result = await userModel.findByIdAndDelete(req.params.id);
    console.log(result);
    if (result) {
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "User deletion failed",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(404).send({
      success: false,
      message: "Error occured  while deleting user",
    });
  }
};

//grpc methods

const getUserGrpc = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user);
    user.password = undefined; // Don't send password to client
    return res.status(200).send({
      status: "success",
      message: "User retrieved successfully",
      data: user,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("Error retrieving user data");
  }
};

module.exports = {
  getUserController,
  updateUser,
  resetPassword,
  updatePassword,
  deleteUser,
  getUserGrpc,
};
