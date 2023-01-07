const housingRouter = require("express").Router();
const HousingController = require("../controllers/housingController");
const isHR = require("../middlewares/isHR");

housingRouter.get("/", HousingController.getAllHousing);
housingRouter.post("/create-house", HousingController.addingHousing);
housingRouter.delete("/delete-house", HousingController.deleteHousing);

module.exports = housingRouter;
