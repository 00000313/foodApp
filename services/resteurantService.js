const resteurantModel = require("../Models/resteurantModel");

class RestaurantService {
  createRestaurant = async (
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
  ) => {
    try {
      console.log("JKLSDJ");
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
      if (!title || !coords) return false;
      const newResteurant = new resteurantModel({
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
      });
      const res = await newResteurant.save();
      return res;
    } catch (error) {
      console.log("Error occured ", error);
      return {
        success: false,
        message: "Error in creating restaurante API",
      };
    }
  };

  async getAll() {
    try {
      console.log("Getting all restaurants");
      const restaurants = await resteurantModel.find({});
      if (!restaurants) return false;
      return restaurants;
    } catch (error) {
      console.log("Error occured ", error);
      return {
        success: false,
        message: "Error in getting all restaurants API",
      };
    }
  }

  getRestaurantById = async (id) => {
    try {
      console.log("Getting restaurant by id");
      const restaurant = await resteurantModel.findById(id);
      if (!restaurant) return false;
      return restaurant;
    } catch (error) {
      console.log("Error occured ", error);
      return res.status(404).send({
        success: false,
        message: "Error in getting restaurant by id API",
      });
    }
  };

  deleteRestaurant = async (id) => {
    try {
      console.log("Deleting restaurant by id");
      const restaurant = await resteurantModel.findByIdAndDelete(id);
      if (!restaurant) {
        return false;
      }
      return restaurant;
    } catch (error) {
      console.log("Error occured while deleting restaurant ", error);
      return {
        success: false,
        message: "Error in deleting restaurant API",
      };
    }
  };
}
module.exports = new RestaurantService();
