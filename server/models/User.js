const { Schema, model } = require("mongoose");

// car schema

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
const workStatusSchema = new Schema({
  status: {
    type: String,
    required: true,
  },
});

// work status schema
const legalStatus = new Schema({
  status: {
    type: String,
  },
  workStatus: {
    type: workStatusSchema,
  },
});

// drivers license schema

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

const userSchema = new Schema({
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
});

const User = model("User", userSchema);

module.exports = User;
