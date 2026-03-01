'use client';

import { useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { BengalInput, BengalButton } from '@/components/bengal';
import { resetPasswordAction } from '@/actions/admin-auth';
import Link from 'next/link';

function ResetPasswordForm() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{type: 'error'|'success', message: string} | null>(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-bengal-alta text-sm mb-4">Invalid or missing reset token.</p>
        <Link href={`/${locale}/admin/login`} className="text-xs text-bengal-kansa hover:text-bengal-kajal transition-colors">
          Back to Login
        </Link>
      </div>
    );
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    if (password.length < 8) {
      setStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const result = await resetPasswordAction(token, password);
    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setTimeout(() => {
        router.push(`/${locale}/admin/login`);
      }, 2000);
    } else {
      setStatus({ type: 'error', message: result.message });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-4">
      <BengalInput
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <BengalInput
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      {status && (
        <p className={`text-sm text-center ${status.type === 'error' ? 'text-bengal-alta' : 'text-green-600'}`}>
          {status.message}
        </p>
      )}

      <BengalButton
        type="submit"
        variant="primary"
        size="touch"
        loading={loading}
        className="mt-2"
        disabled={status?.type === 'success'}
      >
        {status?.type === 'success' ? 'Redirecting...' : 'Reset Password'}
      </BengalButton>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-bengal-kori flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-editorial text-4xl text-bengal-kajal tracking-widest mb-2">
            W O M A N I A
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase text-bengal-kajal/40">
            Reset Password
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-bengal-kansa/30 mb-8" />

        <Suspense fallback={<div className="text-center text-sm text-bengal-kansa">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
