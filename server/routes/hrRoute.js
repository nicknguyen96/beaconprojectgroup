const hrRouter = require("express").Router();

const hrController = require("../controllers/hrController");

// send an invitation to a specified user
hrRouter.post("/sendInvitation", hrController.sendInvitation);

// sending all the users to an admin
hrRouter.get("/sortUser", hrController.sendSortedUsers);

// when HR approves certain file
hrRouter.post("/approvefile", hrController.approveFile);

// when HR reject certain file
hrRouter.post("/rejectFile", hrController.rejectFile);

// when HR send notification for certain file
hrRouter.post("/notification", hrController.sendNotification);

module.exports = hrRouter;
hrRouter.put("/update-boarding-status", hrController.updateOnBoardingStatus);

module.exports = hrRouter;
