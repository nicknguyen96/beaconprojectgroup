const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Employee, EmployeeDetail } = require("../models");

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
      const users = await User.find();
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
    const { updatedStatus, employeeId } = req.body;

    // checking if the id is valid first before we start updating the status
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.json({ status: 404, message: "No employee found" });
    }

    try {
      const userDetails = await Employee.findByIdAndUpdate(employeeId);

      //finding the employee detail schema and updating the sub schema
      const newEmployeeDetail = await EmployeeDetail.findByIdAndUpdate(
        //finding the user details and
        userDetails.user._id,
        { $set: { onboardingStatus: updatedStatus } },
        { new: true }
      );

      /* Returning the user details of the employee. */
      if (!userDetails.user) {
        return res.json({ status: 422, message: "User has not started the onboarding process yet" });
      }
      res.json({ status: 200, message: "Successfully updated employee onboarding status", data: newEmployeeDetail });
    } catch (err) {
      return res.json({ status: 500, message: "Sorry something went wrong" });
    }
  }
}

module.exports = new HrController();
