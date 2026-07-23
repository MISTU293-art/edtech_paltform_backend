import nodemailer from "nodemailer";
console.log("EMAIL:", process.env.NODEMAILER_USER);
console.log("PASS:", process.env.NODEMAILER_PASS);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nexenginner.help@gmail.com",
    pass: "oafjvanbghnyqktl",
  },
});

async function sendRegisterMail(email, name, role) {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Welcome to Our Platform",
      html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f7fb; padding: 30px; margin: 0;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 32px;">
        Welcome, ${name} 🎉
      </h1>
      <p style="color: #e0e7ff; margin-top: 10px; font-size: 18px;">
        Registration Successful
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 30px; color: #374151;">
      <p style="font-size: 18px; margin-bottom: 20px;">
        Hello <strong>${name}</strong>,
      </p>

      <p style="font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
        We are excited to welcome you to our platform. Your account has been created successfully.
      </p>

      <div style="background: #eef2ff; border-left: 5px solid #4f46e5; padding: 15px 20px; border-radius: 10px; margin: 25px 0;">
        <p style="margin: 0; font-size: 16px;">
          <strong>Registered Role:</strong>
          <span style="color: #4f46e5; font-weight: bold;">${role}</span>
        </p>
      </div>

      <p style="font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
        You can now log in and start exploring all the features available on our platform.
      </p>

      <div style="text-align: center; margin-bottom: 30px;">
        <a href="http://localhost:4000/login"
           style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: bold; display: inline-block;">
          Login Now
        </a>
      </div>

      <p style="font-size: 15px; color: #6b7280; line-height: 1.6;">
        If you have any questions, feel free to contact our support team. We are here to help you.
      </p>
    </div>

    <!-- Footer -->
    <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #6b7280; font-size: 14px;">
        © 2026 NexEnginner. All rights reserved.
      </p>
    </div>

  </div>
</div>
`,
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log(error);
  }
}

export default sendRegisterMail;
