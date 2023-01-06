const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../models");

const { uploadFile, getFile } = require('../utils/uploadFile');
// const getFile = require('../utils/getFile');

class UserController {
    async sendInvitation(req, res) {
        // get email
        const { email } = req.body;
        if (!email) {
            return res.json({ status: 400, message: "Email is required" });
        }
        const { isAdmin } = req.headers;

        // create reg token and link
        const token = jwt.sign(
            {
                message: "This token is for invitation purpose",
            },
            process.env.JWT_SECRET_INVITATION,
            {
                expiresIn: "3h",
            }
        );

        const link = `${process.env.FRONTEND_URL}?token=${token}`;
        console.log(link);

        if (isAdmin) {
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
                    res.json({ status: 400, message: error.message });
                } else {
                    return res.json({ status: 401, message: 'You do not have permission to perform this function' })
                }
            });
        } else {
            return res.json({ status: 401, message: "You do not have permission to perform this function" });
        }
    }
    async uploadFile(req, res) {
        // we will distingush which property of user info base on this one.
        const filename = req.file.originalname;
        // we will use middleware to append userid from the token
        const { userid } = req.headers;
        try {

            const validType = ['profilePicture', 'driverLicence', 'workAuthorization', 'other'];
            const fileType = filename && filename.split('-')[0];
            const email = filename && filename.split('-')[1];
            if (!validType.includes(fileType)) {
                return res.json({ status: 400, message: 'file type name should include one of the following: profilePicture, driverLicence, workAuthorization, other' })
            }

            // This codes bellow will check if the email in the file name is the same with the user.email or not
            const user = await User.findById(userid);
            // if (!user || user.email != email){
            //     return res.json({status: 400, message: 'the email should be the same with your email'});
            // }
            const response = await uploadFile(req.file);
            if (response.status == 200) {
                console.log(response)


                // save the file name into the database;
                // user[fileType] = filename;
                // await user.save();

                return res.json({ status: 200, message: 'hello world', data: response })
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            if (error.message == 'Access Denied') {
                return res.json({ status: 403, message: error.message })
            }
            return res.json({ status: 400, message: error.message })
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

        // async getFile(req, res) {
        //     const { filename } = req.params;
        //     const { userid } = req.headers;


        //     try {
        //         const response = await getFile(filename);
        //         if (response.status != 200) {
        //             throw new Error(response.message);
        //         } else {

        //             return res.json({status: 200, message:"get the data successfully", data: response.data})
        //         }
        //     } catch (error){
        //         if (error.message == 'Access Denied') {
        //             return res.json({status: 403, message: error.message})
        //         }
        //         return res.json({status: 400, message: error.message});
        //     }
        // }
    }
}

module.exports = new UserController();
