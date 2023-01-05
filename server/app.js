<<<<<<< HEAD
const express = require('express');
const app = express();

const userRouter = require('./routes/userRoute');

const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

app.use(express.json());

router.get('/', (req, res) => {
    res.json({status: 200, message: {
        email: process.env.email,
        password: process.env.password
    }});
})

app.use('/user', userRouter);
app.use('/', router);

module.exports = app;
=======
const express = require("express");
const db = require("./config/cofig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("listening on port http://localhost:3000");
  });
});
>>>>>>> f80ad95fb647808ece38c45aa98f058d2c1dd1d1
