const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "geoluckymessage@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    },
    // tls: {
    //     rejectUnauthorized: false
    // },
});

module.exports = transporter;