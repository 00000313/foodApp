const userModel = require("../Models/userModel");

class UserService {
  getUser = async (id) => {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return false;
      }
      user.password = undefined; // Don't send password to client
      return user;
    } catch (e) {
      console.error(e);
      return res.status(500).send("Error retrieving user data");
    }
  };

  updateUser = async (id, userName, phone, address) => {
    try {
      console.log("Update user rnning...");
      const user = await userModel.findById(id);
      console.log(user);
      if (!user) {
        return {
          success: false,
          message: "User not found , Invalid user Id",
        };
      }
      //updation  login
      console.log("Updation logic  starts here");
      console.log(userName, phone, address);
      if (userName) user.userName = userName;
      if (phone) user.Phone = phone;
      console.log("ekdsfjklfj");
      if (address) user.Address = address;
      console.log("kdljfklsdjf");
      const updateUser = await user.save();
      console.log(updateUser);

      if (!updateUser) {
        return res.status(400).send({
          success: false,
          message: "Error in update user data",
        }); // Bad request if data is not valid or missing  //400 Bad Request
      }
      return {
        success: true,
        message: "User updated successfully",
        data: updateUser,
      };
    } catch (err) {
      return {
        success: false,
        message: "Error in update  user  API",
        err,
      };
    }
  };
}

module.exports = new UserService();
