const { Schema, model } = require("mongoose");

//function to get the current time
const date = () => {
  const d = new Date(),
    dateFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + " " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
  return dateFormat;
};

// sub schema
const landLordSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// sub schema
const furnitureSchema = new Schema({
  beds: {
    type: Number,
    required: true,
  },
  matresses: {
    type: Number,
    required: true,
  },
  tables: {
    type: Number,
    required: true,
  },
  chairs: {
    type: Number,
    required: true,
  },
});

// sub schema
const summarySchema = new Schema({
  furniture: {
    type: furnitureSchema,
    required: true,
  },
  reports: {
    type: [Schema.Types.ObjectId],
    ref: "Report",
  },
  employeeInfo: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

// sub schema
const housingSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  landlord: {
    type: landLordSchema,
    required: true,
  },
  tenants: {
    type: [Schema.Types.ObjectId],
    ref: "Employee",
  },
  summary: {
    type: summarySchema,
    required: true,
  },
});

const Housing = model("Housing", housingSchema);

module.exports = Housing;
