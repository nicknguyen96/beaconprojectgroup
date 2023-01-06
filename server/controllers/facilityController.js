const User = require('../models/User');
const Report = require('../models/Report');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.createReport = async (req, res) => {
  const { title, description } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { userId } = jwt.decode(token, JWT_SECRET);
  try {
    const report = {
      author: ObjectId(userId),
      title,
      description,
      comments: [],
      status: 'Open'
    };
    const newReport = await Report.create(report);
    const user = await User.update({'_id': userId}, {$push: {'reports': ObjectId(newReport._id)}});
    res.status(201).json({success: true, msg: 'Report Created', data: user});
    // send back report for testing purpose
  } catch(error) {
    res.status(500).json({ success: false, msg: 'Server Error'});
  }
};

exports.getReports = async (req, res) => {
  const { userId } = parseJWT(req.headers.Authorization);
  try {
    const result = await 
      User
      .find({_id: userId})
      .select('+reports')
      .populate({
        path: 'reports', 
        model: 'Reports',
        populate: {
          path: 'comments',
          model: 'Comments'
        }});

    res.status(200).json({ success: true, msg: 'Successfully Get All Reports', data: result})
  } catch(error) {
    res.status(500).json({ success: false, msg: error.message});
  }
};

// exports.createComment = async (res, res) => {
//   const { userId } = parseJWT(req.headers.Authorization);
//   const { text } = req.body;

//   try {
//     await 

//   } catch(error) {
//     res.status(500).json({success: false, msg: error.message})
//   }
// };

exports.getComments = async (req, res) => {
  const { userId } = parseJWT(req.headers.Authorization);

  try {
    const result = await 
      User
      .find({_id: userId})
      .select('+reports')
      .populate({
        path: 'reports', 
        model: 'Report',
        populate: {
          path: 'comments',
          model: 'Comments'
        }});

    res.status(200).json({ success: true, msg: 'Successfully Get All Comments', data: result})
  } catch(error) {
    res.status(500).json({ success: false, msg: error.message});
  }
};