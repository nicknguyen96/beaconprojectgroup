const nodemailer = require("nodemailer");

async function sendEmail(email, subject, html) {
    try {
        const options = {
            from: process.env.email,
            to: email,
            subject: subject,
            html: html,
        };

        const transporter = nodemailer.createTransport({
            // service: "hotmail",
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
        });
        await transporter.sendMail(options);
        console.log('success');
        return { status: 200, message: subject };

    } catch (error) {
        console.log(error);
        return { status: 400, message: error.message };
    }
}

module.exports = sendEmail;