// secret formula
require('dotenv').config();

// dependencies
const express = require('express');
const methodOverride = require('method-override');

// routes
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

// initialize app
const app = express();
const router = express.Router();

// parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/', router);


// home page
// router.get('/', (req, res) => {
//     res.json({status: 200, message: {
//         email: process.env.email,
//         password: process.env.password
//     }});
// })


module.exports = app
