const { Housing } = require("../models");

/// a user should be able to view their assigned housing details

// the address and the list of roomates: {full name + phone number}

// for housing management
//  admin can view existing houses, add a new house, or delete a house

// able to view all existing houses
class HousingController {

  async getHouse(req, res) {
    const { houseid } = req.params;
    if (!houseid) return res.json({ status: 400, message: 'houseid is required' });

    try {
      const house = await Housing.findById(houseid).populate({
        path: 'tenants',
        select: '-password',
        populate: {
          path: 'user',
          
       }
      })
        .populate({
          path: 'summary.reports',
          populate: { path: 'comments', populate: { path: 'author' } }
        })
        .populate({
          path: 'summary.reports',
          populate: { path: 'author', populate: { path: 'user' } }
        });

      return res.json({ status: 200, message: 'get house successfully', data: house })
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: error.message });
    }
  }

  // getting all the houses
  async getAllHousing(req, res) {
    try {
      // getting all the houses and filling in the tenant information
      const allHousing = await Housing.find()
        .populate({
          path: 'tenants',
          populate: { path: 'user' }
        })
        .populate({
          path: 'summary.reports',
          populate: { path: 'comments', populate: { path: 'author' } }
        })
        .populate({
          path: 'summary.reports',
          populate: { path: 'author', populate: { path: 'user' } }
        });

      if (allHousing.length <= 0) {
        return res.status(200).json({ status: 200, message: "No houses have been added" });
      }

      res.status(200).json({ status: 200, message: "get allHousing", data: allHousing });
    } catch (error) {
      return res.json({ status: 500, message: error.message });
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
      res.json({ status: 200, data: newHouse, message: "House has been added" });
    } catch (error) {
      res.json({ status: 400, message: error.message });
    }
  }

  async deleteHousing(req, res) {
    const { id } = req.query;

    if (!id) {
      res.json({ status: 403, message: "No houseid was provided" });
    }
    try {
      await Housing.findByIdAndDelete(id);
      res.json({ status: 200, message: "House has been deleted", id });
    } catch (error) {
      res.json({ status: 400, message: error.message });
    }
  }
}

module.exports = new HousingController();
