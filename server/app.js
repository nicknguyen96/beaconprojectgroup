const express = require('express'); //

const app = express();

require("dotenv").config();
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const housingRouter = require("./routes/housingRoute");
const facilityRoute = require('./routes/facilityRoute');

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/housing", housingRouter);
// app.use("/", router);
app.use('/report', facilityRoute);

// home page
// router.get('/', (req, res) => {
//     res.json({status: 200, message: {
//         email: process.env.email,
//         password: process.env.password
//     }});
// })

module.exports = app;
