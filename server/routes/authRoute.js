const authRouter = require("express").Router();
const AuthController = require("../controllers/authController");

const checkRegToken = require("../middlewares/checkRegToken");

// register an employee
authRouter.post("/register", checkRegToken, AuthController.registerUser);
// authRouter.post("/register", AuthController.registerUser);

// verify register token
authRouter.get("/verifyRgToken", checkRegToken, AuthController.verifyRgToken);

// login an employee
authRouter.post("/login", AuthController.loginUser);

// log out
authRouter.post("/logout", AuthController.logout);

module.exports = authRouter;
