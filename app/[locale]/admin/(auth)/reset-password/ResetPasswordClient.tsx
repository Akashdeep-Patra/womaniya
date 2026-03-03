'use client';

import { useState, useTransition } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { BengalInput, BengalButton } from '@/components/bengal';
import Link from 'next/link';
import { resetPassword } from '@/actions/auth';
import { toast } from 'sonner';

export default function ResetPasswordClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = params.locale as string;

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!email || !token) {
    return (
      <div className="min-h-screen bg-bengal-kori flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-bengal-alta mb-4">Invalid or missing reset token.</p>
          <Link prefetch={true} href={`/${locale}/admin/login`} className="text-sm font-medium text-bengal-kansa hover:underline">
            Go back to login
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.set('email', email);
    formData.set('token', token);
    formData.set('password', password);

    startTransition(async () => {
      try {
        await resetPassword(formData);
        setSuccess(true);
        toast.success('Password reset successfully!');
        setTimeout(() => {
          router.push(`/${locale}/admin/login`);
        }, 2000);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message || 'Failed to reset password. Token may have expired.');
        } else {
          toast.error('Failed to reset password. Token may have expired.');
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-bengal-kori flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-editorial text-4xl text-bengal-kajal tracking-widest mb-2">
            W O M A N I A
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-bengal-kajal/40">
            Set New Password
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-bengal-kansa/30 mb-8" />

        {success ? (
          <div className="text-center">
            <div className="mb-6 p-4 bg-[#2D7A4F]/10 border border-[#2D7A4F]/30 rounded-lg">
              <p className="text-sm text-[#2D7A4F] font-medium">
                Your password has been reset successfully. Redirecting to login...
              </p>
            </div>
            <Link prefetch={true} href={`/${locale}/admin/login`} className="text-xs font-semibold uppercase tracking-wider text-bengal-sindoor hover:text-bengal-alta transition-colors">
              Go to Login now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm text-bengal-kajal/70 text-center mb-2">
              Resetting password for: <strong>{email}</strong>
            </p>

            <BengalInput
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />

            <BengalInput
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />

            <BengalButton
              type="submit"
              variant="primary"
              size="touch"
              loading={isPending}
              className="mt-2"
            >
              Reset Password
            </BengalButton>
          </form>
        )}
      </div>
    </div>
  );
}