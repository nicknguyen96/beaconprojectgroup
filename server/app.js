require("dotenv").config();
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const methodOverride = require("method-override");
const express = require("express");
const facilityRoute = require('./routes/facilityRoute');

const router = express.Router();

const app = express();

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/", router);
app.use('/report', facilityRoute);

// home page
// router.get('/', (req, res) => {
//     res.json({status: 200, message: {
//         email: process.env.email,
//         password: process.env.password
//     }});
// })

module.exports = app;
