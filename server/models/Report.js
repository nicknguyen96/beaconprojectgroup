const { Schema, model } = require("mongoose");
const { Employee } = require("../models");

//function to return the time
const date = () => {
  const d = new Date(),
    dateFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + " " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
  return dateFormat;
};

const reportSchema = new Schema({
  author: {
    type: Schema.Type.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timeStamp: {},
});

const Report = model("report", reportSchema);

module.exports = Report;
