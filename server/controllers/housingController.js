const { Housing } = require("../models");

/// a user should be able to view their assigned housing details

// the address and the list of roomates: {full name + phone number}

// for housing management
//  admin can view existing houses, add a new house, or delete a house

// able to view all existing houses
class HousingController {
  async getAllHousing(req, res) {
    try {
      const allHousing = await Housing.find();

      console.log(allHousing);

      if (allHousing.length <= 0) {
        return res.status(200).json("No houses have been added");
      }

      res.status(200).json(allHousing);
    } catch (error) {
      return res.status(500).json("Sorry, unable to get housing details");
    }
  }
}

module.exports = new HousingController();
