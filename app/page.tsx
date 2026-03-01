import { redirect } from 'next/navigation';

// Root "/" redirects to the default locale.
// The next-intl middleware handles locale detection for all other routes.
export default function RootPage() {
  redirect('/en');
}
