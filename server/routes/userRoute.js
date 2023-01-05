const userRouter = require('express').Router();
const userController = require('../controllers/userController');

const isAdmin = require('../middlewares/isAdmin');

// send an invitation to a specified user
userRouter.post('/sendInvitation', isAdmin, userController.sendInvitation);

module.exports = userRouter;