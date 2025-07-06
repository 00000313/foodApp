const grpc = require("@grpc/grpc-js");
const resService = require("../../services/resteurantService");

// gRPC handler for creating a restaurant
const CreateRestaurant = async (call, callback) => {
  const {
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
  } = call.request;
  console.log("KDFJK");
  try {
    const newRestaurant = resService.createRestaurant(
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords
    );
    if (!newRestaurant) return "Failed to create new restaurant";
    callback(null, newRestaurant);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

// gRPC handler for fetching all restaurants
const getAllRestaurantsGrpc = async (call, callback) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "No restaurants found",
      });
    }
    callback(null, { restaurants });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

// gRPC handler for fetching a restaurant by ID
const getRestaurantByIdGrpc = async (call, callback) => {
  const restaurantId = call.request.id;

  try {
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Restaurant not found",
      });
    }
    callback(null, restaurant);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

// gRPC handler for deleting a restaurant by ID
const deleteRestaurantGrpc = async (call, callback) => {
  const restaurantId = call.request.id;

  try {
    const restaurant = await restaurantModel.findByIdAndDelete(restaurantId);
    if (!restaurant) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Restaurant not found",
      });
    }
    callback(null, restaurant);
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};

module.exports = {
  CreateRestaurant,
  getAllRestaurantsGrpc,
  getRestaurantByIdGrpc,
  deleteRestaurantGrpc,
};
