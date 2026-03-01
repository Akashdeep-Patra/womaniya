import nodemailer from 'nodemailer';

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // If SMTP is not configured, we'll just log the email (useful for dev)
  if (!process.env.SMTP_HOST) {
    console.log('\n=================== MOCK EMAIL ===================');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${html}`);
    console.log('==================================================\n');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"Womaniya Admin" <noreply@womaniya.com>',
    to,
    subject,
    html,
  });
}
