const { Housing } = require("../models");

/// a user should be able to view their assigned housing details

// the address and the list of roomates: {full name + phone number}

// for housing management
//  admin can view existing houses, add a new house, or delete a house

// able to view all existing houses
class HousingController {
  // getting all the houses
  async getAllHousing(req, res) {
    try {
      // getting all the houses and filling in the tenant information
      const allHousing = await Housing.find().populate("User");

      if (allHousing.length <= 0) {
        return res.status(200).json("No houses have been added");
      }

      res.status(200).json(allHousing);
    } catch (error) {
      return res.status(500).json("Sorry, unable to get housing details");
    }
  }

  async addingHousing(req, res) {
    const { houseInfo } = req.body;

    if (!houseInfo) {
      return res.status(403).json("Not all inputs have been filed");
    }

    try {
      // creating the new house with the user input
      const newHouse = await Housing.create(houseInfo);

      console.log(newHouse);

      return res.status(200).json(newHouse, { message: "House has been added" });
    } catch (error) {
      res.status(500).json("Sorry something went wrong");
    }
  }

  async deleteHousing(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(403).json("No house provided");
    }
    try {
      const deletedHouse = await Housing.findByIdAndDelete(id);

      console.log(deletedHouse);

      res.status(200).json("House has been deleted");
    } catch (err) {
      return res.status(500).json("Sorry, something went wrong");
    }
  }
}

module.exports = new HousingController();
