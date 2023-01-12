const employeeDetailRouter = require("express").Router();
const employeeDetailController = require("../controllers/employeeDetailController");
const HousingController = require("../controllers/housingController")

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

employeeDetailRouter.put("/uploadFile", upload.single("image"), employeeDetailController.uploadFile);

employeeDetailRouter.post("/submitDetails", employeeDetailController.submitUserDetails);

employeeDetailRouter.put("/updateDetails", employeeDetailController.updateUserDetails);

employeeDetailRouter.get("/getFile/:filename", employeeDetailController.getFile);

employeeDetailRouter.get('/getHouse/:houseid', HousingController.getHouse);

module.exports = employeeDetailRouter;
