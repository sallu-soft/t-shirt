import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Please reset your password by clicking the link: ${resetUrl}`,
    html: `<p>Please reset your password by clicking <a href="${resetUrl}">here</a>.</p>`,
  });
}