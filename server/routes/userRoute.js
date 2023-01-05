const userRouter = require("express").Router();
const userController = require("../controllers/userController");

const isAdmin = require("../middlewares/isAdmin");

// send an invitation to a specified user
userRouter.post("/sendInvitation", isAdmin, userController.sendInvitation);

// sending all the users to an admin
userRouter.get("/sortUser", isAdmin, userController.sendSortedUsers);

module.exports = userRouter;
