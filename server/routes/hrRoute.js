const hrRouter = require("express").Router();

const hrController = require("../controllers/hrController");

// send an invitation to a specified user
hrRouter.post("/sendInvitation", hrController.sendInvitation);

// sending all the users to an admin
hrRouter.get("/sortUser", hrController.sendSortedUsers);

// when HR update file status certain file
hrRouter.put("/updateFileStatus", hrController.updateFileStatus);

hrRouter.put("/update-boarding-status", hrController.updateOnBoardingStatus);

module.exports = hrRouter;
