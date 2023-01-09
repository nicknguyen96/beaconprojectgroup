const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Employee } = require("../models");
const { EmployeeDetail, LegalStatus, WorkStatus, FileUpload } = require('../models/EmployeeDetail');
const sendEmail = require('../utils/sendEmail');

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

      const subject = 'Invitation to registration';
      const html = `
        <header>
            Hello ${email}! Welcome to my project management app!
        </header>
        <main>
            <p>Please click <a href=${link}>here</a> to sign up your account.</p>
            <p>This link will expire in 3 hours.</p>
        </main>
    `;

      const response = await sendEmail(email, subject, html);
      console.log(response);
      if (response.status == 200) {
        res.json({ status: 200, message: "Send email successfully" });
      } else {
        res.json({ status: 400, message: response.message });
      }
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

      return res.json({ status: 200, message: "successfully get all employees", data: sorted });
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: error.message });
    }
  }

  async updateOnBoardingStatus(req, res) {
    const { onboardingStatus, employeeid, message } = req.body;

    try {
      // checking if the id is valid first before we start updating the status
      if (!employeeid) {
        throw new Error("employeeid must be provided.");
      }

      const employee = await Employee.findById(employeeid).populate("user");

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
      const html = `
                      <header>
                          Hello ${employee.email}! There is a message for you.
                      </header>
                      <main>
                          <p>${message}<p>
                          <p>Login <a href=${process.env.BACKEND_URL}>into</a> your account now to see the changes.</p>
                      </main>
                  `;
      const subject = "Changes in your onBoading Application";

      const response = await sendEmail(employee.email, subject, html);

      if (response.status == 200) {
        res.json({ status: 200, message: "Successfully updated and send email" });
      } else {
        res.json({ status: 400, message: response.message });
      }

    } catch (error) {
      console.log(error);
      return res.json({ status: 500, message: error.message });
    }
  }

  // approve certain file
  async updateFileStatus(req, res) {
    try {
      const { employeeid, fileName, message, status } = req.body;
      const employee = await
        Employee
          .findById(employeeid)
          .select('-password');
      if (!employee) {
        res.json({ status: 404, message: 'Employee Doesn\'t Exist' });
      } else {
        console.log("employee ", employee);
        await EmployeeDetail.findOneAndUpdate(
          { "_id": employee.user },
          {
            $set: {
              'legalStatus.workStatus.fileUpload.$[file].status': status,
              'legalStatus.workStatus.fileUpload.$[file].message': message,
            }
          },
          { arrayFilters: [{ 'file.fileName': fileName }] });

        const subject = "New status in file uploaded";
        const html = `
                        <header>
                            Hello ${employee.email}! This is a remainder for missing file
                        </header>
                        <main>
                            <p>Please login Portal and upload the required file</p>
                            <p>Thank you for your corporation.</p>
                        </main>
                    `;

        const response = await sendEmail(employee.email, subject, html);

        if (response.status == 200) {
          res.json({ status: 200, message: `Update file ${fileName} to be ${status}` });
        } else {
          res.json({ status: 400, message: response.message });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: error.message });
    }
  };
}

module.exports = new HrController();
