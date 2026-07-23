import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "nexenginner.help@gmail.com",
    pass: "oafjvanbghnyqktl",
  },
});

async function sendCoursePurchaseMail(email, name, amountPaid, paymentStatus) {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "🎉 Course Purchased Successfully",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Course Purchase</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px;">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.1);">

<tr>
<td style="background:#4F46E5;padding:30px;text-align:center;">
<h1 style="margin:0;color:#ffffff;">
🎉 Purchase Successful
</h1>
</td>
</tr>

<tr>
<td style="padding:35px;">

<h2 style="color:#222;">
Hello ${name} 👋
</h2>

<p style="font-size:16px;color:#555;line-height:1.8;">
Congratulations! Your payment has been received successfully.
Your course is now available in your dashboard.
</p>

<div style="background:#f3f4f6;border-radius:10px;padding:20px;margin:25px 0;">

<h3 style="margin-top:0;color:#4F46E5;">
📚 Purchase Details
</h3>

<p><strong>Course:</strong> ${courseTitle}</p>

<p><strong>Amount Paid:</strong> ₹${amountPaid}</p>

<p>
<strong>Payment Status:</strong>

<span style="
background:#22c55e;
color:white;
padding:4px 10px;
border-radius:20px;
font-size:13px;
">
${paymentStatus}
</span>

</p>

<p><strong>Purchase Date:</strong> ${new Date().toLocaleDateString()}</p>

</div>

<p style="font-size:16px;color:#555;">
Start learning today and build amazing projects.
We wish you a wonderful learning journey 🚀
</p>

<div style="text-align:center;margin:35px 0;">

<a
href="http://localhost:5173/my-courses"
style="
background:#4F46E5;
color:#fff;
padding:14px 28px;
text-decoration:none;
border-radius:8px;
font-size:16px;
display:inline-block;
font-weight:bold;
">
Start Learning
</a>

</div>

<hr style="border:none;border-top:1px solid #e5e7eb;">

<p style="font-size:14px;color:#666;text-align:center;">
If you have any questions, simply reply to this email.
Our support team is always happy to help.
</p>

</td>
</tr>

<tr>
<td style="background:#f9fafb;padding:20px;text-align:center;">

<p style="margin:0;color:#777;font-size:13px;">
© ${new Date().getFullYear()} NexEngineer • Learn • Build • Grow
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
    });

    console.log("Purchase email sent successfully");
  } catch (error) {
    console.log(error);
  }
}
export default sendCoursePurchaseMail;
