const jwt = require("jsonwebtoken");
const { BlackListToken } = require('../models/index');

module.exports = async function isHR(req, res, next) {

  const token = req.rawHeaders[1].split(' ')[1];
  const user = jwt.decode(token);
  const inBlackList = await BlackListToken.findOne({token});
  
  if (user.isHR && (Date.now()/1000 < user.exp) && !inBlackList) {
    req.headers["isHR"] = "true";
    req.headers["userid"] = user.userid;
  } else if ((Date.now()/1000 > user.exp) || inBlackList) {
    return res.json({ status: 403, message: "Invalid Token"})
  }
  
  return next();
};
