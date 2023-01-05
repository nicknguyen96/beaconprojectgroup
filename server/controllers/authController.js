const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async registerUser(req, res) {
        const newEmployee = new Employee({
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            isAdmin: false,
        });

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newEmployee.password, salt);
        newEmployee.password = hashedPassword;

        // insert code here to remove the register token 
        //
        //

        // save new employee, then give them an access token
        newEmployee.save().then(createdEmployee => {
            const payload = { userId: createdEmployee._id };
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.status(200).json({
                token: accessToken,
                isAdmin: false,
                expiresIn: 3600,
                id: createdEmployee._id
            });
        });
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
        const employee = await Employee.findOne({ email: req.body.email.toLowerCase() })
        if (!employee) return res.status(401).send({ message: "User not found!" });

        // check if user credentials are correct
        const password = await bcrypt.compare(req.body.password, employee.password);
        if (!password) return res.status(401).send({ message: "Invalid password!" });

        const payload = { userId: employee._id };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            token: accessToken,
            isAdmin: employee.isAdmin,
            expiresIn: 3600,
            id: employee._id
        });
    }
}

module.exports = new AuthController();