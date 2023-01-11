const { Housing } = require("../models");

/// a user should be able to view their assigned housing details

// the address and the list of roomates: {full name + phone number}

// for housing management
//  admin can view existing houses, add a new house, or delete a house

// able to view all existing houses
class HousingController {
  // getting all the houses
  async getAllHousing(req, res) {
    console.log("the req is ", req)
    try {
      // getting all the houses and filling in the tenant information
      const allHousing = await Housing.find().populate({
        path: 'tenants',
        model: 'Employee',
        populate: {
          path: 'user',
          model: 'EmployeeDetail'
        }
      });

      if (allHousing.length <= 0) {
        return res.status(200).json({ status: 200, message: "No houses have been added" });
      }

      res.status(200).json({ status: 200, message: "get allHousing", data: allHousing });
    } catch (error) {
      return res.json({ status: 200, message: error.message });
    }
  }

  async addingHousing(req, res) {
    const { houseInfo } = req.body;

    if (!houseInfo) {
      throw new Error("Not all inputs have been filed");
    }

    try {
      // creating the new house with the user input
      const newHouse = await Housing.create(houseInfo);

      console.log(newHouse);

      return res.json({ status: 200, data: newHouse, message: "House has been added" });
    } catch (error) {
      console.log(error);
      res.json({ status: 400, message: error.message });
    }
  }

  async deleteHousing(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.json({ status: 403, message: "No houseid was provided" });
    }
    try {
      const deletedHouse = await Housing.findByIdAndDelete(id);

      console.log(deletedHouse);

      res.status(200).json({ status: 200, message: "House has been deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 400, message: error.message });
    }
  }
}

module.exports = new HousingController();
