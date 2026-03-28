import type { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // 16-char Google App Password
  },
});

export async function sendContactEmail(req: Request, res: Response) {
  const { firstName, lastName, email, message } = req.body;

  if (!email || !message) {
    res.status(400).json({ error: "Email and message are required." });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New message from ${firstName ?? ""} ${lastName ?? ""}`.trim(),
      html: `
        <p><strong>From:</strong> ${firstName ?? ""} ${lastName ?? ""}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
}
