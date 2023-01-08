const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Employee } = require("../models");
const { EmployeeDetail, LegalStatus, WorkStatus, FileUpload } = require('../models/EmployeeDetail');

class HrController {
  async sendInvitation(req, res) {
    // get email
    const { email } = req.body;
    if (!email) {
      return res.json({ status: 400, message: "Email is required" });
    }
    const { isHR } = req.headers;

    // create reg token and link
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.JWT_SECRET_INVITATION,
      {
        expiresIn: "3h",
      }
    );

    const link = `${process.env.FRONTEND_URL}?token=${token}`;
    console.log(link);

    if (isHR) {
      const options = {
        from: process.env.email,
        to: email,
        subject: "Sending email with nodejs",
        html: `
                        <header>
                            Hello ${email}! Welcome to my project management app!
                        </header>
                        <main>
                            <p>Please click <a href=${link}>here</a> to sign up your account.</p>
                            <p>This link will expire in 3 hours.</p>
                        </main>
                    `,
      };
      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      transporter.sendMail(options, function (error, info) {
        if (error) {
          console.log(error);
          return res.json({ status: 400, message: error.message });
        } else {
          res.json({ status: 200, message: info });
        }
      });
    } else {
      return res.json({ status: 401, message: "You do not have permission to perform this function" });
    }
  }

  //sending sorted users
  async sendSortedUsers(req, res) {
    try {
      const users = await Employee.find({ isHR: false }).populate({
        path: "user",
      });
      if (users.length <= 0) {
        return res.status(200).json("User list is empty");
      }

      // function to sort all the users by last name
      const sorted = users.sort((a, b) => {
        const lastNameA = a.lastName;
        const lastNameB = b.lastName;

        if (lastNameA < lastNameB) {
          return -1;
        }
        if (lastNameA > lastNameB) {
          return 1;
        }
        return 0;
      });

      res.status(200).json(sorted);
    } catch (err) {
      res.status(500).json({ message: "Sorry something went wrong" });
    }
  }

  async updateOnBoardingStatus(req, res) {
    const { onboardingStatus, employeeId, message } = req.body;

    try {
      // checking if the id is valid first before we start updating the status
      if (!employeeId) {
        throw new Error("employeeId must be provided.");
      }

      const employee = await Employee.findById(employeeId).populate("user");

      if (!employee) {
        return res.json({ status: 404, message: "No employee found" });
      }

      //finding the employee detail schema and updating the sub schema
      const newEmployeeDetail = await EmployeeDetail.findByIdAndUpdate(
        //finding the user details and update it
        employee.user.id,
        { $set: { onboardingStatus } },
        { new: true }
      );

      // send email to employee to notify them the changes
      const options = {
        from: process.env.email,
        to: employee.email,
        subject: "Changes from onboarding application status",
        html: `
                        <header>
                            Hello ${employee.email}! There is a message for you.
                        </header>
                        <main>
                            <p>${message}<p>
                            <p>Login <a href=${process.env.BACKEND_URL}>into</a> your account now to see the changes.</p>
                        </main>
                    `,
      };
      const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      transporter.sendMail(options, function (error, info) {
        if (error) {
          console.log(error);
          throw new Error("Cannot send email. Please try again");
        }
      });

      res.json({ status: 200, message: "Successfully updated employee onboarding status", data: newEmployeeDetail });
    } catch (err) {
      console.log(err);
      return res.json({ status: 400, message: err.message });
    }
  }

    // approve certain file
    async approveFile(req, res) {
        try {
            const { employeeId, fileName } = req.body;
            const employee = await 
                Employee
                .findOne({'_id': employeeId})
                .select('-password');
            if(!employee) {
                res.json({ status: 404, msg: 'Employee Doesn\'t Exist'});
            } else {
                await EmployeeDetail.findOneAndUpdate(
                    {"_id": employee.user},
                    {$set: {
                      'legalStatus.workStatus.fileUpload.$[file].status': 'Approved',
                      'legalStatus.workStatus.fileUpload.$[file].message': 'Approved',
                    }},
                    {arrayFilters: [{'file.fileName': fileName}]});
                res.json({ status: 201, msg: 'File approved' });
            }
        } catch(error) {
            res.json({ status: 500, msg: error.message });
        }
    };

    // when hr reject certain file
    async rejectFile(req, res) {
      try {
        const { employeeId, fileName, message } = req.body;
        const employee = await 
            Employee
            .findOne({'_id': employeeId})
            .select('-password');
        if(!employee) {
            res.json({ status: 404, msg: 'Employee Doesn\'t Exist'});
        } else {
            await EmployeeDetail.findOneAndUpdate(
                {"_id": employee.user},
                {$set: {
                  'legalStatus.workStatus.fileUpload.$[file].status': 'Rejected',
                  'legalStatus.workStatus.fileUpload.$[file].message': message,
                }},
                {arrayFilters: [{'file.fileName': fileName}]});
            res.json({ status: 201, msg: 'File Rejected' });
        }
      } catch(error) {
        res.json({ status: 500, msg: error.message });
      }
    };
    // when hr send notification to user
    async sendNotification(req, res) {
        try {
            // get email
            const { email } = req.body;
            if (!email) {
                return res.json({ status: 400, message: "Email is required" });
            }

            // set ups for email notification
            const options = {
                from: process.env.email,
                to: email,
                subject: "Sending email with nodejs",
                html: `
                                <header>
                                    Hello ${email}! This is a remainder for missing file
                                </header>
                                <main>
                                    <p>Please login Portal and upload the required file</p>
                                    <p>Thank you for your corporation.</p>
                                </main>
                            `,
            };
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: process.env.email,
                    pass: process.env.password,
                }
            });
            transporter.sendMail(options, function (error, info) {
                if (error) {
                  console.log(error);
                  return res.json({ status: 400, message: error.message });
                } else {
                  res.json({ status: 200, message: info });
                }
              });
        } catch(error) {
            res.json({ status: 500, msg: error.message });
        }
    }
}

module.exports = new HrController();
