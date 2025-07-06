const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { getUserGrpc, registerUser } = require("./services/userGrpcHandler");

// Load the .proto file for the UserService
const PROTO_PATH = path.resolve(__dirname, "./proto/user.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).UserService;

// Create a new gRPC server
const grpcServer = new grpc.Server();

// Register the UserService and its methods
grpcServer.addService(userProto.service, {
  getUserGrpc,
  registerUser,
});

// Start the gRPC server
const startGrpcServer = () => {
  const GRPC_PORT = process.env.GRPC_PORT || 50051;

  grpcServer.bindAsync(
    `0.0.0.0:${GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("Error starting gRPC server:", err);
        return;
      }
      grpcServer.start();
      console.log(`gRPC server running on port ${port}`);
    }
  );
};

module.exports = startGrpcServer;
