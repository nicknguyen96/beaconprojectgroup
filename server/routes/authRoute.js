const authRouter = require('express').Router();
const authController = require('../controllers/authController');

const checkRegToken = require('../middlewares/checkRegToken');

// register an employee
authRouter.post('/register', checkRegToken, authController.registerUser);

// login an employee
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;