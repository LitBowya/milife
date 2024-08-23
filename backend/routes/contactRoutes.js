import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Use environment variables for sensitive information
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Replace with your Gmail address
    pass: process.env.GMAIL_PASS, // Replace with your app password
  },
});

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log("Validation error: Missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: email,
    to: "andrewbanfro@gmail.com",
    subject: `Contact Form Submission from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send message" });
    }
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ message: "Message sent successfully" });
  });
});

export default router;
