const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const regToken = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(regToken, process.env.JWT_SECRET_INVITATION);
        if (Date.now() / 1000 > decodedToken.exp) {
            return res.json({ status: 403, message: 'Your jwt is expired. Please login again' });
        } else {
            const { email } = decodedToken;
            req.headers["email"] = email;
            next();
        }
    }
    catch (error) {
        console.log('you do not have a reg token.');
        res.json({ status: 401, message: error.message })
    }
};