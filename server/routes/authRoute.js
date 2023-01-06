const authRouter = require('express').Router();
const AuthController = require('../controllers/authController');

const checkRegToken = require('../middlewares/checkRegToken');

// register an employee
authRouter.post('/register', AuthController.registerUser);

// login an employee
authRouter.post('/login', AuthController.loginUser);

// log out 
authRouter.post('/logout', AuthController.logout);

module.exports = authRouter;