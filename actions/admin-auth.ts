'use server';
import { auth } from '@/auth';

import { db } from '@/lib/db';
import { admins } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { logger } from '@/lib/logger';

export async function forgotPasswordAction(email: string) {
  // No auth check — this is for unauthenticated users who forgot their password
  try {
    // Check if the user is in DB. If they are an ENV-only admin, we must insert them into the DB first.
    let adminUser = await db.select().from(admins).where(eq(admins.email, email)).limit(1).then(res => res[0]);

    if (!adminUser) {
      if (email === process.env.ADMIN_EMAIL) {
        // They are an env admin but not in DB yet. Create them with current env password as hash
        // So that they exist in DB and can have a reset token
        const hashedEnvPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || '', 10);
        const [newAdmin] = await db.insert(admins).values({
          email: process.env.ADMIN_EMAIL,
          password_hash: hashedEnvPassword,
        }).returning();
        adminUser = newAdmin;
      } else {
        return { success: true, message: "If the email is registered, a reset link will be sent." };
      }
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

    await db.update(admins)
      .set({ reset_token: resetToken, reset_token_expiry: resetTokenExpiry })
      .where(eq(admins.id, adminUser.id));

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/en/admin/reset-password?token=${resetToken}`;

    // Try to send email if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Womaniya Admin" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Womaniya - Reset Admin Password',
        text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
        html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link is valid for 1 hour.</p>`,
      });
      logger.info('Password reset email sent', { email });
    } else if (process.env.NODE_ENV !== 'production') {
      logger.info('SMTP not configured — reset link for dev', { email, resetUrl });
    }

    return { success: true, message: "If the email is registered, a reset link will be sent." };
  } catch (error) {
    logger.error('Forgot password error', { error });
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function resetPasswordAction(token: string, newPassword: string) {
  // No auth check — this is for unauthenticated users resetting via a token
  try {
    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: "Password must be at least 8 characters." };
    }
    const adminList = await db.select().from(admins).where(eq(admins.reset_token, token)).limit(1);
    const adminUser = adminList[0];

    if (!adminUser) {
      return { success: false, message: "Invalid or expired reset token." };
    }

    if (!adminUser.reset_token_expiry || new Date() > adminUser.reset_token_expiry) {
      return { success: false, message: "Reset token has expired." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.update(admins)
      .set({
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expiry: null,
      })
      .where(eq(admins.id, adminUser.id));

    return { success: true, message: "Password has been successfully updated." };
  } catch (error) {
    logger.error('Reset password error', { error });
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
