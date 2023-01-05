const router = require('express').Router();
const { createReport, comment } = require('../controllers/facilityController');

router.post('/create', createReport);
router.post('/comment', comment);
module.exports = router;
