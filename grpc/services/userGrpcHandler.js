const grpc = require("@grpc/grpc-js");
const userService = require("../../services/userService");
const {
  registerController,
} = require("../../controller/Auth Controller/authController");

// gRPC handler for fetching a user by ID
const getUserGrpc = async (call, callback) => {
  try {
    console.log("LKDJFKJKj");
    const userId = call.request.id;
    console.log("skjfkj");
    console.log("Fetching user with ID:", userId);

    const user = await userService.getUser(userId);
    console.log(user);
    if (user) {
      // Return user data as per the proto fields
      callback(null, {
        id: user._id,
        userName: user.userName,
        email: user.email,
        address: user.Address,
        phone: user.Phone,
        userType: user.userType,
        profile: user.profile,
        answer: user.answer,
      });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "User not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

// gRPC handler for registering a new user
const registerUser = async (call, callback) => {
  const { userName, email, password, phone, address, answer } = call.request;
  console.log("Registering user:", userName, email);

  try {
    const result = await registerController({
      userName,
      email,
      password,
      phone,
      address,
      answer,
    });
    callback(null, result); // Assuming the `registerController` returns the appropriate response
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

module.exports = {
  getUserGrpc,
  registerUser,
};
