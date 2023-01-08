const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();
const { employeeDetailRouter, authRouter, housingRouter, hrRouter } = require("./routes/index");
const isHR = require("./middlewares/isHR");

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use("/user", employeeDetailRouter);
app.use("/auth", authRouter);
app.use("/housing", housingRouter);
app.use("/hr", isHR, hrRouter);

module.exports = app;
