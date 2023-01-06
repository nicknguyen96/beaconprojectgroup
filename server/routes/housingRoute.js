const housingRouter = require("express").Router();
const HousingController = require("../controllers/housingController");
const isAdmin = require("../middlewares/isHR");

housingRouter.get("/", HousingController.getAllHousing);
housingRouter.post("/create-house", HousingController.addingHousing);
housingRouter.delete("/delete-house", HousingController.deleteHousing);

module.exports = housingRouter;
