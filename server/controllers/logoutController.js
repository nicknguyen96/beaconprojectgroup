const path = require('path');
// store the token black list on AWS S3 cloud or on server ?
const { Black_List } = require('../model/model');

// logic for log out user
// delete the token from client side and black list the token on server side
exports.logout = async (req, res) => {
  const { token } = req.body;
  try {
    await 
    Black_List.create({ token }).then(() => {
      res.status(200).json({ success: true, msg: 'Logged out'});
    })
    .catch((error) => new Error(error));
    
  } catch(error) {
    req.status(500).json({ success: true, msg: 'Server Error, Please try again'});
  };
}