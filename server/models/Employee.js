const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Employee = model("employee", employeeSchema);

module.exports = Employee;
