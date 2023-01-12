const facilityRouter = require('express').Router();
const { createReport, getReportsAndComments, createComment, closeReport } = require('../controllers/facilityController');

facilityRouter.post('/create', createReport);
facilityRouter.get('/reportsAndcomments', getReportsAndComments);
facilityRouter.post('/comment', createComment);
facilityRouter.post('/close', closeReport);
module.exports = facilityRouter;
