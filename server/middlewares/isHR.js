const jwt = require("jsonwebtoken");

module.exports = function isHR(req, res, next) {
  req.headers["isHR"] = "true";
  return next();
};
