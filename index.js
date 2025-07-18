const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: 'Today\'s study tracking',
    text: 'This is a reminder to track your study progress for today.\nFill your study log at ' + process.env.STUDY_LOG_URL,
    html: `This is a reminder to track your study progress for today.<br>
           Fill your study log at <a href="${process.env.STUDY_LOG_URL}">${process.env.STUDY_LOG_URL}</a>`,
};

cron.schedule('0 10 * * *', () => {
    console.log('Cron job triggered!');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred while sending email:', error);
        }
        console.log('Email sent successfully:', info.response);
    });
}, { timezone: 'Asia/Kolkata' });