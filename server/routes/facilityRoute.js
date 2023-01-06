const router = require('express').Router();
const { createReport, getReportsAndComments, createComment, closeReport } = require('../controllers/facilityController');

router.post('/create', createReport);
router.get('/reportsAndcomments', getReportsAndComments);
router.post('/comment', createComment);
router.post('/close', closeReport);
module.exports = router;
