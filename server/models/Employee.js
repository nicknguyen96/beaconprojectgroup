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
  isHR: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
