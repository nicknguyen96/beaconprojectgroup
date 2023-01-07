const express = require('express');

const app = express();

require("dotenv").config();
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const housingRouter = require("./routes/housingRoute");

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS enable
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/housing", housingRouter);

module.exports = app;
