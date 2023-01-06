const express = require("express");

const app = express();

require("dotenv").config();
const { employeeDetailRouter, authRouter, housingRouter, hrRouter } = require("./routes/index");
const isHR = require("./middlewares/isHR");

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", employeeDetailRouter);
app.use("/auth", authRouter);
app.use("/housing", housingRouter);
app.use("/hr", hrRouter);

module.exports = app;
