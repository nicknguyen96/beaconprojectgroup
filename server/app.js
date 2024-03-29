const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();
const { employeeDetailRouter, authRouter, housingRouter, hrRouter, facilityRouter } = require("./routes/index");
const isHR = require("./middlewares/isHR");

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
// app.use(cors(corsOptions));
app.use(cors());  

app.use("/user", employeeDetailRouter);
app.use("/auth", authRouter);
app.use("/housing", isHR, housingRouter);
app.use("/hr", isHR, hrRouter);
app.use('/report', facilityRouter)

module.exports = app;
