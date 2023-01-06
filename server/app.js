const express = require("express");

const app = express();

require("dotenv").config();
const employeeDetail = require("./routes/employeeDetailRoute");
const authRouter = require("./routes/authRoute");
const housingRouter = require("./routes/housingRoute");

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employeeDetail", employeeDetail);
app.use("/auth", authRouter);
app.use("/housing", housingRouter);

module.exports = app;
