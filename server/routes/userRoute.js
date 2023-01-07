const userRouter = require("express").Router();
const userController = require("../controllers/userController");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage : storage })

const isHR = require('../middlewares/isHR');

// send an invitation to a specified user
userRouter.post("/sendInvitation", isHR, userController.sendInvitation);

userRouter.put('/uploadFile', upload.single('image'), userController.uploadFile);

userRouter.post('/submitDetails', userController.submitUserDetails);

userRouter.put('/updateDetails', userController.updateUserDetails);

// userRouter.get('/getFile/:filename', userController.getFile);

// sending all the users to an admin
userRouter.get("/sortUser", isHR, userController.sendSortedUsers);

module.exports = userRouter;
