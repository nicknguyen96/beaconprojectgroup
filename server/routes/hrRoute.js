const hrRouter = require('express').Router();

const hrController = require('../controllers/hrController');

// send an invitation to a specified user
hrRouter.post("/sendInvitation", hrController.sendInvitation);

// sending all the users to an admin
hrRouter.get("/sortUser", hrController.sendSortedUsers);

// when HR approves certain file
hrRouter.post("/inprogress", hrController.approveFile);

// when HR reject certain file

module.exports = hrRouter;