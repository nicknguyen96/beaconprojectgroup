const userRouter = require('express').Router();
const userController = require('../controllers/userController');

const verifyUser = require('../middlewares/verifyUser');

userRouter.post('/sendInvitation', verifyUser, userController.sendInvitation);

module.exports = userRouter;