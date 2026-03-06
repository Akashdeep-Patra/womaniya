'use server';

import { db } from '@/lib/db';
import { admins } from '@/db/schema';
import { ratelimit } from '@/lib/ratelimit';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function requestPasswordReset(formData: FormData) {
  if (ratelimit) {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? '127.0.0.1';
    const { success } = await ratelimit.limit(`reset_${ip}`);
    if (!success) throw new Error('Too many requests. Please try again later.');
  }
  const email = formData.get('email') as string;
  if (!email) {
    throw new Error('Email is required');
  }

  // 1. Check if admin exists in DB
  const dbAdmins = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  const adminUser = dbAdmins[0];

  // We don't want to leak whether an email exists or not, but since it's an internal admin tool, it's okay to throw if not found, or just return silently.
  // For security, it's generally better to just return even if the user isn't found.
  if (!adminUser) {
    // Just return to prevent email enumeration
    return { success: true };
  }

  // 2. Generate a reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  // 3. Save token to DB
  await db.update(admins)
    .set({
      reset_token: resetToken,
      reset_token_expiry: tokenExpiry,
      updated_at: new Date(),
    })
    .where(eq(admins.id, adminUser.id));

  // 4. Send email
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/en/admin/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

  await sendEmail({
    to: email,
    subject: 'Womaniya Admin - Password Reset',
    html: `
      <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You recently requested to reset your password for the Womaniya Admin Platform.</p>
        <p>Click the link below to reset it. This link will expire in 1 hour.</p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #8A1C14; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Reset Password</a>
        </p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">If you did not request this, please ignore this email or contact support.</p>
      </div>
    `,
  });

  return { success: true };
}

export async function resetPassword(formData: FormData) {
  if (ratelimit) {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ?? headersList.get('x-real-ip') ?? '127.0.0.1';
    const { success } = await ratelimit.limit(`reset_confirm_${ip}`);
    if (!success) throw new Error('Too many requests. Please try again later.');
  }
  const email = formData.get('email') as string;
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  if (!email || !token || !password) {
    throw new Error('Missing required fields');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  // 1. Verify token
  const dbAdmins = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  const adminUser = dbAdmins[0];

  if (!adminUser || adminUser.reset_token !== token) {
    throw new Error('Invalid or expired reset token');
  }

  if (!adminUser.reset_token_expiry || adminUser.reset_token_expiry < new Date()) {
    throw new Error('Reset token has expired');
  }

  // 2. Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Update password and clear token
  await db.update(admins)
    .set({
      password_hash: hashedPassword,
      reset_token: null,
      reset_token_expiry: null,
      updated_at: new Date(),
    })
    .where(eq(admins.id, adminUser.id));

  return { success: true };
}
