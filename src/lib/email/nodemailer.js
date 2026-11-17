// create transporter

import nodemailer from "nodemailer";
import {env} from "../config/env.js";
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.nodemailer.user,
        pass: env.nodemailer.password,
    }
});
export function sendEmail(to,subject,html) {

    transporter.sendMail({
        from: `"NGL-APP" <${env.nodemailer.user}>`,
        to: to,
        subject: subject,
        html: html
    })};

