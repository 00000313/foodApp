/* eslint-disable no-undef */
const express = require("express");
const morgan = require("morgan");
const dotenv = require('dotenv');
const cors = require("cors");

const startGrpcServer = require('./grpc/server');
// const path = require('path');
// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');

dotenv.config();
const { connectDB } = require("./config/db");

// Connect to MongoDB
connectDB();

// // Load the gRPC proto file
// const packageDefinition = protoLoader.loadSync(path.join(__dirname, './proto/user.proto'), {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// const userProto = grpc.loadPackageDefinition(packageDefinition);

// // Define the gRPC method implementation
// const getUserGrpc = async (call, callback) => {
//   try {
//     const userId = call.request.id; // Get the userId from the request

//     console.log(userId);

//     const user = await userModel.findById(userId); // Fetch user by ID

//     if (user) {
//       // Return user data, mapping fields from the database model to the fields in the proto file
//       callback(null, {
//         id: user._id.toString(),
//         userName: user.userName,
//         email: user.email,
//         Address: user.Address,
//         Phone: user.Phone,
//         userType: user.userType,
//         profile: user.profile,
//         answer: user.answer
//       });
//     } else {
//       callback({
//         code: grpc.status.NOT_FOUND,
//         details: "User not found",
//       }); // Return NOT_FOUND error if user not found
//     }
//   } catch (error) {
//     callback({
//       code: grpc.status.INTERNAL,
//       details: error.message, // Return INTERNAL error with the message
//     });
//   }
// };

// // Create the gRPC server
// const grpcServer = new grpc.Server();

// grpcServer.addService(userProto.UserService.service, {
//   getUserGrpc: getUserGrpc, // Use the correct gRPC service method name as per your proto file
// });

// // Start the gRPC server
// const GRPC_PORT = process.env.GRPC_PORT || 50051;
// grpcServer.bindAsync(`0.0.0.0:${GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
//   if (err) {
//     console.error("Error starting gRPC server:", err);
//     return;
//   }
//   grpcServer.start();
//   console.log(`gRPC server running on port ${port}`);
// });

// Create the Express app
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Define Express routes
try {
  app.get('/healthz', (req, res) => {
  res.status(200).send('Continuous Integration added');
});
  app.use("/api/v1/auth", require("./Routes/authRoute"));
  app.use("/api/v1/test", require("./Routes/testRoutes"));
  app.use("/api/v1/user", require("./Routes/userRoutes"));
  app.use('/api/v1/restaurant', require("./Routes/resteurant"));
  app.use('/api/v1/category', require("./Routes/categoryRoutes"));
  // app.use('/api/v1/food', require("./Routes/foodRoutes'));
} catch (error) {
  console.error("Error loading routes:", error);
}

// Define a basic welcome route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the food server!");
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

startGrpcServer();