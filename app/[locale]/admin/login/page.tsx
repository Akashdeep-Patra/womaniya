'use client';

import { useState } from 'react';
import { signIn }   from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { BengalInput }  from '@/components/bengal';
import { BengalButton } from '@/components/bengal';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t      = useTranslations('admin');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(t('login_error'));
      setLoading(false);
    } else {
      router.replace(`/${locale}/admin`);
    }
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
            {t('login_title')}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-bengal-kansa/30 mb-8" />

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <BengalInput
            label={t('login_email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <BengalInput
            label={t('login_password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <p className="text-bengal-alta text-sm text-center">{error}</p>
          )}

          <BengalButton
            type="submit"
            variant="primary"
            size="touch"
            loading={loading}
            className="mt-2"
          >
            {t('login_button')}
          </BengalButton>
        </form>
      </div>
    </div>
  );
}
