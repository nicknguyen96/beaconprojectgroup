const express = require("express");
const app = express();

const userRouter = require("./routes/userRoute");

const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: {
      email: process.env.email,
      password: process.env.password,
    },
  });
});

app.use("/user", userRouter);
app.use("/", router);

module.exports = app;
