const router = require('express').Router();
const { createReport, getReports, createComment, getComments } = require('../controllers/facilityController');

router.post('/create', createReport);
router.get('/reports', getReports);
// router.post('/comment', createComment);
router.get('/comments', getComments);
module.exports = router;
