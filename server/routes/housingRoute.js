const housingRouter = require("express").Router();
const HousingController = require("../controllers/housingController");
const isAdmin = require("../middlewares/isAdmin");

housingRouter.get("/", HousingController.getAllHousing);

module.exports = housingRouter;
