const { Schema, model } = require("mongoose");

// sub schema
const carSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// if no legal status then work authorization

// sub schema
const workStatusSchema = new Schema({
  visaTitle: {
    required: true,
    type: String,
  },
  issuedDate: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  fileUpload: {
    type: String,
    required: true,
  },
});

// work status schema
// sub schema
const legalStatus = new Schema({
  status: {
    type: String,
  },
  workStatus: {
    type: workStatusSchema,
    required: false,
  },
});

// drivers license schema
// sub schema
const licenseSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

const employeeDetailSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  preferredName: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  currentAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  car: {
    type: carSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  SSN: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
  },
  legalStatus: {
    type: legalStatus,
  },
  driversLicense: {
    type: licenseSchema,
  },
  reports: {
    required: false,
    type: [Schema.Types.ObjectId],
    ref: "Report",
  },
});

const EmployeeDetail = model("EmployeeDetail", employeeDetailSchema);

module.exports = EmployeeDetail;
