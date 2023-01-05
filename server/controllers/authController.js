const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

// register a user into the portal.
module.exports.registerUser = async (req, res) => {
    const newEmployee = new Employee ({
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        role: 'employee' 
    });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newEmployee.password, salt);
    newEmployee.password = hashedPassword;

    // insert code here to remove the register token 
    //
    //

    // save new employee, then give them an access token
    newEmployee.save().then(createdEmployee => {
        const payload = {userId: createdEmployee._id};
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({
            token: accessToken,
            expiresIn: 3600,
            id: createdEmployee._id
        });
    });
};

module.exports.loginUser = async (req, res) => {
        // check if user exists
        const employee = await Employee.findOne({ email: req.body.email.toLowerCase() })
        if (!employee) return res.status(401).send({ message: "User not found!" });
    
        // check if user credentials are correct
        const password = await bcrypt.compare(req.body.password, employee.password);
        if (!password) return res.status(401).send({ message: "Invalid password!" });
    
        const payload = {userId: employee._id};
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({
            token: accessToken,
            expiresIn: 3600,
            id: employee._id
        });
}