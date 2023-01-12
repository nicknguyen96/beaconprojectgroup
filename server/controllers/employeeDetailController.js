const jwt = require("jsonwebtoken");
const { EmployeeDetail, Employee } = require("../models");

const { uploadFile, getFile } = require("../utils/uploadFile");
// const getFile = require('../utils/getFile');

class UserController {
  async uploadFile(req, res) {
    // console.log(req.file);

    // res.json({ status: 200, data: req.file });
    // we will distingush which property of user info base on this one.
    const filename = req.file.originalname;

    console.log(req.file);
    // we will use middleware to append userid from the token
    const { employeeid } = req.body;
    console.log(employeeid);
    try {
      const validType = ["profilePicture", "driversLicense", "i983", "optreceipt", "i20", "optead"];
      const fileType = filename && filename.split("-")[0];
      const email = filename && filename.split("-")[1];
      if (!validType.includes(fileType)) {
        return res.json({
          status: 400,
          message: "file type name should include one of the following: profilePicture, driversLicense, i983, optReceipt, i20, optead",
        });
      }
      const employee = await Employee.findById(employeeid);
      if (!employee) {
        throw Error("No employee was found given userid");
      }

      const employeeDetail = await EmployeeDetail.findById(employee.user);
      if (!employeeDetail) {
        throw Error("No employee detail was found given userid");
      }
      const response = await uploadFile(req.file);
      if (response.status == 200) {

        const property = req.file.originalname.split("-")[0];
        if (property == "profilePicture") {
          employeeDetail[property] = response.url;
        } else if (property == "driversLicense") {
          if (!employeeDetail.driversLicense) employeeDetail.driversLicense = {};
          employeeDetail.driversLicense.picture = response.url;

        } else {
          // save the work document here
          const fileUploadSchema = {
            fileName: property,
            fileUrl: response.url,
            status: "Pending",
            message: "Waiting for HR to approve",
          };
          console.log("been here");
          if (property.toLowerCase() == 'optreceipt') {
            employeeDetail.legalStatus.workStatus.fileUpload[0] = fileUploadSchema;
          } else if (property.toLowerCase() == 'optead') {
            employeeDetail.legalStatus.workStatus.fileUpload[1] = fileUploadSchema;
          } else if (property.toLowerCase() == 'i983') {
            employeeDetail.legalStatus.workStatus.fileUpload[2] = fileUploadSchema;
          } else if (property.toLowerCase() == 'i20') {
            employeeDetail.legalStatus.workStatus.fileUpload[3] = fileUploadSchema;
          } else {
            throw Error("no property match with the filename");
          }
        }
        await employeeDetail.save();
        return res.json({ status: 200, message: "hello world", data: employeeDetail });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
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
    const employeeDetails = req.body.employeeDetails;
    const employeeDetailsId = req.body.employeeDetailsId;

    // fileUpload should be an array of file with file name and file url. Prefer the EmployeeDetail model
    // if (employeeDetails.legalStatus) employeeDetails.legalStatus.workStatus.fileUpload = [];

    console.log(employeeDetails);
    try {
      const employee = await EmployeeDetail.findByIdAndUpdate(employeeDetailsId, employeeDetails, { $new: true });

      if (employeeDetails.onboardingStatus == 'Never submitted') employee.onboardingStatus = 'Pending';
      
      console.log(employee);

      return res.json({ status: 200, message: "Employee details have been saved", data: employee });
    } catch (e) {
      console.log(e);
      res.json({
        status: 400,
        message: "ERROR: Something unexpected happened on the backend when attemping to update user info.",
        error: e,
      });
    }
  }

  async getFile(req, res) {
    const { filename } = req.params;

    try {
      const response = await getFile(filename);
      if (response.status != 200) {
        throw new Error(response.message);
      } else {
        return res.json({ status: 200, message: "get the data successfully", data: response.data });
      }
    } catch (error) {
      if (error.message == "Access Denied") {
        return res.json({ status: 403, message: error.message });
      }
      return res.json({ status: 400, message: error.message });
    }
  }
}

module.exports = new UserController();
