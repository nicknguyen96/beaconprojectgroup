const jwt = require('jsonwebtoken');


module.exports = function verifyUser (req, res, next){
    req.headers['isAdmin'] = 'true';
    return next();
}