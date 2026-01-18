import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER || "me@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD || "app_password",
  },
});

export default transporter;