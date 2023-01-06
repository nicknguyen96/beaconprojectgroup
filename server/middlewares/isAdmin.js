const jwt = require("jsonwebtoken");

module.exports = function isAdmin(req, res, next) {
  req.headers["isAdmin"] = "true";
  return next();
};
