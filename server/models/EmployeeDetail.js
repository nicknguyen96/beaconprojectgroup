const { string } = require("joi");
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
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
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
    default : [],
    required: true,
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
    default: 'Greencard | Citizen | Other | OPT',
    required: true,
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

const contactInfoSchema = new Schema({
  firstName: {
    type: String,
    default: 'firstName',
    required: true
  },
  lastName: {
    type: String,
    default: 'lastName',
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    default: 'xxxxxxxxxx',
    required: true
  },
  email :{
    type: String,
    default: 'email',
    required: true
  },
  relationship: {
    type: String,
    default: 'Family',
    required: true
  }
})

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
    required: true,
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
  housing: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Housing",
  },
  onboardingStatus: {
    type: String,
    required: true,
    default: "Never submitted",
  },
  emergencyContact: {
    type: contactInfoSchema,
    required: true,
  },
  referenceContact: {
    type: contactInfoSchema,
    required: false,
  }
});

const EmployeeDetail = model("EmployeeDetail", employeeDetailSchema);
module.exports = EmployeeDetail;