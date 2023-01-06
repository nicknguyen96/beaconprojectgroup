const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

class AuthController {
    async registerUser(req, res) {

        // check the token from the invitation link is match with the email or not
        // extract email from the headers that we done in the middleware
        const { email } = req.headers;
        const { password } = req.body;
        if (!(email && email.toLowerCase() == req.body.email.toLowerCase())) {
            return res.json({ status: 401, message: "Email doesn't match with the email in the invitation link" })
        }
        try {
            const employee = await Employee.findOne({ email });

            if (employee) {
                return res.json({ status: 409, message: "This email has been created. Please login" });
            }

            // validate the email and password
            const schema = Joi.object({
                email: Joi.string().email(),
                password: Joi.string()
                    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
            });
            const validate = schema.validate({ email, password });
            if (validate.error) {
                return res.json({ status: 422, message: validate.error.message })
            }

            const newEmployee = new Employee({
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                isHR: false,
            });
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newEmployee.password, salt);
            newEmployee.password = hashedPassword;

            await newEmployee.save();

            const payload = { userid: newEmployee._id, isHR: false };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });

            return res.json({ status: 200, message: "Successfully create new employee", data: { token, userid: newEmployee._id, isHR: false } })

        } catch (error) {
            console.log(error.message);
            return res.json({ status: 400, message: "Something wrong while creating new employee. Please contact your HR or try again." })
        }
    }

    async logout(req, res) {
        const { token } = req.body;
        try {
            await
                Black_List.create({ token }).then(() => {
                    res.status(200).json({ success: true, msg: 'Logged out' });
                })
                    .catch((error) => new Error(error));

        } catch (error) {
            req.status(500).json({ success: true, msg: 'Server Error, Please try again' });
        };
    }

    async loginUser(req, res) {
        // check if user exists
        try {
            const { email, password } = req.body;
            const schema = Joi.object({
                email: Joi.string().email(),
                password: Joi.string()
                    .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
            });
            const validate = schema.validate({ email, password });
            if (validate.error) {
                return res.json({ status: 422, message: validate.error.message })
            }

            const employee = await Employee.findOne({ email: email.toLowerCase() })
            if (!employee) return res.status(404).send({ message: "User not found!" });
            // check if user credentials are correct
            const comparePassword = await bcrypt.compare(password, employee.password);
            if (!comparePassword) return res.status(401).send({ message: "Invalid password!" });

            const payload = {
                userid: employee._id,
                isHR: employee.isHR
            };
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
            res.status(200).json({
                token: accessToken,
                isHR: employee.isHR,
                id: employee._id
            });
        } catch (error) {
            console.log(error.message);
            res.json({ status: 400, message: error.message });
        }

    }
}

module.exports = new AuthController();