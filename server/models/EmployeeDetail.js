const { Schema, model } = require("mongoose");

// sub schema
const carSchema = new Schema({
  make: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});

const fileUploadSchema = new Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

// if no legal status then work authorization

// sub schema
const workStatusSchema = new Schema({
  visaTitle: {
    type: String,
    default: "visa title",
    required: true,
  },
  issuedDate: {
    type: String,
    default: "issued date",
    required: true,
  },
  expirationDate: {
    type: String,
    default: "expiration date",
    required: true,
  },
  fileUpload: {
    type: [fileUploadSchema],
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

// work status schema
// sub schema
const legalStatus = new Schema({
  isCompleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
  workStatus: {
    type: workStatusSchema,
  },
});

// drivers license schema
// sub schema
const licenseSchema = new Schema({
  number: {
    type: String,
    default: "enter your driver licence number here",
    required: true,
  },
  expiration: {
    type: String,
    default: "enter your expiration date",
    required: true,
  },
  picture: {
    type: String,
    default: "enter your driver licence here",
    required: true,
  },
});

const employeeDetailSchema = new Schema({
  firstName: {
    type: String,
    default: "Enter your first name here",
    required: true,
  },
  lastName: {
    type: String,
    default: "Enter your last name here",
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
    default: "Enter your email here",
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "Enter your phone number here",
    required: true,
  },
  car: {
    type: carSchema,
    required: false,
  },
  SSN: {
    type: String,
    default: "Enter your SSN",
    required: true,
  },
  DOB: {
    type: String,
    default: Date.now,
    required: true,
  },
  gender: {
    type: String,
    default: "male",
    required: true,
  },
  legalStatus: {
    type: legalStatus,
    required: false,
  },
  driversLicense: {
    type: licenseSchema,
    required: false,
  },
  reports: {
    required: false,
    type: [Schema.Types.ObjectId],
    ref: "Report",
  },
  onboardingStatus: {
    type: String,
    required: true,
    default: "In Progress",
  },
});

const EmployeeDetail = model("EmployeeDetail", employeeDetailSchema);
const LegalStatus = model("LegalStatus", legalStatus);
const WorkStatus = model("WorkStatus", workStatusSchema);

module.exports = {EmployeeDetail, LegalStatus, WorkStatus};
