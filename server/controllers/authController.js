const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { BlackListToken, Employee, EmployeeDetail, Housing } = require("../models");

// maximum of tenents in the house
const MAX_COMPACITY = 4;

class AuthController {
  async registerUser(req, res) {
    // check the token from the invitation link is match with the email or not
    // extract email from the headers that we done in the middleware
    const { email } = req.headers;
    const { password } = req.body;
    if (!(email && email.toLowerCase() == req.body.email.toLowerCase())) {
      return res.json({ status: 401, message: "Email doesn't match with the email in the invitation link" });
    }

    try {
      const employee = await Employee.findOne({ email });

      if (employee) {
        return res.json({ status: 409, message: "This email has been created. Please login" });
      }

      // validate the email and password
      const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
      });
      const validate = schema.validate({ email, password });
      if (validate.error) {
        return res.json({ status: 422, message: validate.error.message });
      }

      const newEmployee = new Employee({
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        isHR: false,
      });
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newEmployee.password, salt);
      newEmployee.password = hashedPassword;

      const legalStatus = {
        isCompleted: false,
        status: "Greencard | Citizen | Other | OPT",
        workStatus: {
          visaTitle: "visa title",
          issuedDate: Date(),
          expirationDate: Date(),
          fileUpload: [],
          message: "some messages",
        },
      };

      const employeeDetail = new EmployeeDetail({ legalStatus });

      // assign employee to the available house
      const availableHouse = await Housing.find();
      for (let i = 0; i < availableHouse.length; i++) {
        if (availableHouse[i].tenants.length < MAX_COMPACITY) {
          employeeDetail.housing = availableHouse[i]._id;
          availableHouse[i].tenants.push(newEmployee._id);
          await employeeDetail.save();
          await availableHouse[i].save();
          break;
        }
      }

      newEmployee.user = employeeDetail._id;

      await newEmployee.save();

      const payload = { userid: newEmployee._id, isHR: false };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });

      return res.json({ status: 201, message: "Successfully create new employee", data: { token, userid: newEmployee._id, isHR: false } });
    } catch (error) {
      console.log(error.message);
      return res.json({ status: 400, message: "Something wrong while creating new employee. Please contact your HR or try again." });
    }
  }

  async logout(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.json({ status: 400, message: "invalid token" });
    try {
      await BlackListToken.create({ token })
      res.json({ status: 200, messag: "Logout successfully" });
    } catch (error) {
      res.json({ status: 500, message: error.message });
    }
  }

  async loginUser(req, res) {
    // check if user exists
    try {
      const { email, password } = req.body;
      const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
      });
      const validate = schema.validate({ email, password });
      if (validate.error) {
        return res.json({ status: 422, message: validate.error.message });
      }

      const employee = await Employee.findOne({ email: email.toLowerCase() }).populate("user");
      if (!employee) return res.status(404).send({ message: "User not found!" });
      // check if user credentials are correct
      const comparePassword = await bcrypt.compare(password, employee.password);
      if (!comparePassword) return res.status(401).send({ message: "Invalid password!" });

      const payload = {
        userid: employee._id,
        isHR: employee.isHR,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
      res.json({
        token: accessToken,
        employee: employee,
        isHR: employee.isHR,
      });
    } catch (error) {
      console.log(error.message);
      res.json({ status: 400, message: error.message });
    }
  }
}

module.exports = new AuthController();
