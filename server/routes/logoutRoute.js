const router = require('express').Router();
const { logout } = require('../controllers/logoutController');

router.post('/logout', logout);

module.exports = router;