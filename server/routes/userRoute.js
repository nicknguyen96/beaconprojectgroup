const userRouter = require('express').Router();
const userController = require('../controllers/userController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage : storage })

const isAdmin = require('../middlewares/isAdmin');

// send an invitation to a specified user
userRouter.post('/sendInvitation', isAdmin, userController.sendInvitation);

userRouter.put('/uploadFile', upload.single('image'), userController.uploadFile);

// userRouter.get('/getFile/:filename', userController.getFile);

module.exports = userRouter;