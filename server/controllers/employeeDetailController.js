const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { EmployeeDetail } = require("../models");

const { uploadFile, getFile } = require("../utils/uploadFile");
// const getFile = require('../utils/getFile');

class UserController {

  async uploadFile(req, res) {
    // we will distingush which property of user info base on this one.
    const filename = req.file.originalname;
    // we will use middleware to append userid from the token
    const { userid } = req.headers;
    try {
      const validType = ["profilePicture", "driverLicence", "workAuthorization", "other"];
      const fileType = filename && filename.split("-")[0];
      const email = filename && filename.split("-")[1];
      if (!validType.includes(fileType)) {
        return res.json({
          status: 400,
          message: "file type name should include one of the following: profilePicture, driverLicence, workAuthorization, other",
        });
      }

      // This codes bellow will check if the email in the file name is the same with the user.email or not
      const user = await EmployeeDetail.findById(userid);
      // if (!user || user.email != email){
      //     return res.json({status: 400, message: 'the email should be the same with your email'});
      // }
      const response = await uploadFile(req.file);
      if (response.status == 200) {
        console.log(response);

        // save the file name into the database;
        // user[fileType] = filename;
        // await user.save();

        return res.json({ status: 200, message: "hello world", data: response });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error.message == "Access Denied") {
        return res.json({ status: 403, message: error.message });
      }
      return res.json({ status: 400, message: error.message });
    }
  }

  // first time user submits all their details
  async submitUserDetails(req, res) {
    try {
      const newUser = new EmployeeDetail(req.body.data);
      await newUser.save();
      res.status(200).json({
        message: "User details have been submitted!",
      });
    } catch (e) {
      res.status(400).json({
        message: "ERROR: Something unexpected happened on the backend when attemping to submit user info.",
        error: e,
      });
    }
  }

  async updateUserDetails(req, res) {
    try {
      // get the user id
      const { id } = req.body.uid;
      const user = await User.findByIdAndUpdate(id, { ...req.body.data });
      await user.save();
      res.status(200).json({
        message: "User details have been updated!",
      });
    } catch (e) {
      res.status(400).json({
        message: "ERROR: Something unexpected happened on the backend when attemping to update user info.",
        error: e,
      });
    }
  }

  // async getFile(req, res) {
  //     const { filename } = req.params;
  //     const { userid } = req.headers;

  //     try {
  //         const response = await getFile(filename);
  //         if (response.status != 200) {
  //             throw new Error(response.message);
  //         } else {

  //             return res.json({status: 200, message:"get the data successfully", data: response.data})
  //         }
  //     } catch (error){
  //         if (error.message == 'Access Denied') {
  //             return res.json({status: 403, message: error.message})
  //         }
  //         return res.json({status: 400, message: error.message});
  //     }
  // }

}

module.exports = new UserController();
