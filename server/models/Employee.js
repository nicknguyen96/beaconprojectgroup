const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const Employee = model("employee", employeeSchema);

module.exports = Employee;
