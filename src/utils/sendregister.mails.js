import nodemailer from "nodemailer";
import mailTemplate from "./mailTemplate.js";

const sendMail = async ({ name, email, verificationLink }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const { html, text } = mailTemplate(name, verificationLink);

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Account",
        html,
        text
    });
};
export default sendMail;