// create transporter

import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
export function sendEmail(to,subject,html) {

    transporter.sendMail({
        from: `"NGL-APP" <${process.env.MAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
    })};

