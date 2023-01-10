const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { BlackListToken } = require('../models/index');

module.exports = async function isHR(req, res, next) {

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.json({status: 400, message: "must provide valid authorization header"});
    const user = jwt.decode(token, JWT_SECRET);
    console.log(user);
    const inBlackList = await BlackListToken.findOne({ token });
    if (user && user.isHR && (Date.now() / 1000 < user.exp) && !inBlackList) {
      req.headers["isHR"] = "true";
      req.headers["userid"] = user.userid;
    } else if ((Date.now() / 1000 > user.exp) || inBlackList) {
      return res.json({ status: 403, message: "Invalid Token" })
    } else if (!user.isHR) {
      return res.json({ status: 403, message: "Unauthorized Employee" })
    }

    return next();

  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: error.message })
  }
};
