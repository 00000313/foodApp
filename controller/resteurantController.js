const resteurantModel = require("../Models/resteurantModel");
const resService = require("../services/resteurantService");

const createReateurant = async (req, res) => {
  try {
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
    } = req.body;
    console.log(
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
    const result = await resService.createRestaurant(
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
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Error in creating restaurante API",
      });
    }
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      restaurant: result,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return res.status(404).send({
      success: false,
      message: "Error in creating restaurante API",
    });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    console.log("DKfkfk");
    const restaurants = await resService.getAll();
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All restaurants",
      totalCounts: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return res.status(404).send({
      success: false,
      message: "Error in getting all restaurants API",
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    console.log("Getting restaurant by id");
    const restaurant = await resService.getRestaurantById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant",
      restaurant,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return res.status(404).send({
      success: false,
      message: "Error in getting restaurant by id API",
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    console.log("Deleting restaurant by id");
    const restaurant = await resService.deleteRestaurant(req.params.id);
    console.log(restaurant);
    if (restaurant == false) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log("Error occured while deleting restaurant ", error);
    return res.status(404).send({
      success: false,
      message: "Error in deleting restaurant API",
    });
  }
};

module.exports = {
  createReateurant,
  getAllRestaurants,
  getRestaurantById,
  deleteRestaurant,
};
