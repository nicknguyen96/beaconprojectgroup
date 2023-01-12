const { Schema, model } = require("mongoose");
const { Employee } = require("../models");

//function to return the time
const date = () => {
  const d = new Date(),
    dateFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + " " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
  return dateFormat;
};

// sub schema
const commentsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  timeStamp: {
    type: String,
    default: date(),
  },
});

const reportSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
    default: "N/A",
  },

  title: {
    type: String,
    required: true,
    default: "N/A",
  },

  description: {
    type: String,
    required: true,
    default: "N/A",
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments",
    required: false,
  }],

  status: {
    type: String,
    required: true,
    default: "N/A",
  },

  timeStamp: {
    type: String,
    default: date(),
  },
});

const Report = model("Report", reportSchema);
const Comments = model("Comments", commentsSchema);
module.exports = { Report, Comments };
