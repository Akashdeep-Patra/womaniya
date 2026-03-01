'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BengalInput, BengalButton } from '@/components/bengal';
import { useTranslations } from 'next-intl';
import { forgotPasswordAction } from '@/actions/admin-auth';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const t      = useTranslations('admin');
  const params = useParams();
  const locale = params.locale as string;

  const [email,    setEmail]    = useState('');
  const [status,   setStatus]   = useState<{type: 'error'|'success', message: string} | null>(null);
  const [loading,  setLoading]  = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const result = await forgotPasswordAction(email);
    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setEmail('');
    } else {
      setStatus({ type: 'error', message: result.message });
    }
    setLoading(false);
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

        {/* Form */}
        <form onSubmit={handleForgot} className="flex flex-col gap-4">
          <BengalInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
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
          >
            Send Reset Link
          </BengalButton>
          
          <div className="text-center mt-4">
            <Link href={`/${locale}/admin/login`} className="text-xs text-bengal-kansa hover:text-bengal-kajal transition-colors">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
