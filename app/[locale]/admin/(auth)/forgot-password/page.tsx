'use client';

import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { BengalInput, BengalButton } from '@/components/bengal';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { requestPasswordReset } from '@/actions/auth';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const t = useTranslations('admin');
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);

    startTransition(async () => {
      try {
        await requestPasswordReset(formData);
        setSuccess(true);
      } catch (err) {
        toast.error('Failed to request password reset. Please try again.');
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
            Forgot Password
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-bengal-kansa/30 mb-8" />

        {success ? (
          <div className="text-center">
            <div className="mb-6 p-4 bg-bengal-kansa/10 border border-bengal-kansa/30 rounded-lg">
              <p className="text-sm text-bengal-kajal">
                If an account exists with that email, a password reset link has been sent. Check your terminal logs if you are developing locally without an SMTP server.
              </p>
            </div>
            <Link href={`/${locale}/admin/login`} className="text-xs font-semibold uppercase tracking-wider text-bengal-sindoor hover:text-bengal-alta transition-colors">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm text-bengal-kajal/70 text-center mb-2">
              Enter your email address to receive a password reset link.
            </p>

            <BengalInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <BengalButton
              type="submit"
              variant="primary"
              size="touch"
              loading={isPending}
              className="mt-2"
            >
              Send Reset Link
            </BengalButton>

            <div className="text-center mt-4">
              <Link href={`/${locale}/admin/login`} className="text-xs text-bengal-kansa hover:text-bengal-kajal transition-colors">
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}