const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const regToken = req.headers.authorization.split(" ")[1];
        jwt.verify(regToken, process.env.JWT_SECRET_INVITATION);
        console.log('token succes');
        next();
    }
    catch (err) {
        console.log('you do not have a reg token.');
        res.status(401).send({message: "You cannot access without a reg token!"});
    }
};