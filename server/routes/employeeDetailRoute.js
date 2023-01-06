const employeeDetailRouter = require("express").Router();
const employeeDetailController = require("../controllers/employeeDetailController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const isAdmin = require("../middlewares/isAdmin");

// send an invitation to a specified user
employeeDetailRouter.post("/sendInvitation", isAdmin, employeeDetailController.sendInvitation);

employeeDetailRouter.put("/uploadFile", upload.single("image"), employeeDetailController.uploadFile);

employeeDetailRouter.post("/submitDetails", employeeDetailController.submitUserDetails);

employeeDetailRouter.put("/updateDetails", employeeDetailController.updateUserDetails);

// employeeDetailRouter.get('/getFile/:filename', employeeDetailController.getFile);

module.exports = employeeDetailRouter;
// sending all the users to an admin
employeeDetailRouter.get("/sortUser", isAdmin, employeeDetailController.sendSortedUsers);

module.exports = employeeDetailRouter;
