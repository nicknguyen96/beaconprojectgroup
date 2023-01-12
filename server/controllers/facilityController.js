const EmployeeDetail = require('../models/EmployeeDetail');
const Employee = require('../models/Employee');
const { Report, Comments } = require('../models/Report');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { Housing } = require('../models');
const { JWT_SECRET } = process.env;

exports.createReport = async (req, res) => {
  try {
    const { title, description, houseid } = req.body;
    console.log(houseid);
    const token = req.headers.authorization.split(" ")[1];
    // the userid here is actually employee model id
    const { userid } = jwt.decode(token, JWT_SECRET);
    const report = {
      author: ObjectId(userid),
      title,
      description,
      comments: [],
      status: 'Open'
    };
    if (!houseid) return res.json({ status: 400, message: "houseid must be included" })
    // the user here is the actual user model Id
    const { user } = await Employee.findOne({ "_id": userid });
    const newReport = await Report.create(report);
    const house = await Housing.findById(houseid);
    house.summary.reports.push(newReport);
    await house.save()
    const userUpdate = await EmployeeDetail.updateOne({ '_id': user }, { $push: { 'reports': newReport._id } });
    res.json({ status: 201, msg: 'Report Created', data: newReport });
  } catch (error) {
    res.json({ status: 500, msg: 'Server Error' });
  }
};

exports.getReportsAndComments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // the userid here is actually employee model id
    const { userid } = jwt.decode(token, JWT_SECRET);
    // the user here is the actual user model Id
    const { user } = await Employee.findOne({ "_id": userid });
    const result = await
      EmployeeDetail
        .findOne({ _id: user })
        .select({ "reports": 1 })
        .populate({
          path: 'reports',
          model: 'Report',
          populate: {
            path: 'comments',
            model: 'Comments'
          }
        });
    res.json({ status: 200, msg: 'Successfully Get All Reports', data: result })
  } catch (error) {
    res.json({ status: 500, msg: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { reportId, description } = req.body;
    const { userid } = jwt.decode(token, JWT_SECRET);
    const comment = { description, author: userid };
    const newComment = await Comments.create(comment);
    const updateResult = await Report.updateOne(
      { "_id": reportId },
      {
        $push: { 'comments': newComment._id },
        $set: { "status": "In Progress" }
      });
    res.json({ status: 201, msg: 'Comment Created', data: updateResult })
  } catch (error) {
    res.json({ status: 500, msg: error.message })
  }
};

exports.closeReport = async (req, res) => {
  try {
    const { reportId } = req.body;
    const updateResult = await Report.updateOne({ "_id": reportId }, { $set: { "status": "Closed" } });
    res.json({ status: 200, msg: "Report Closed", data: updateResult });
  } catch (error) {
    res.json({ status: 500, msg: error.message });
  }
};
