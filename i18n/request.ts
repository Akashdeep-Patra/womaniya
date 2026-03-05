import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const jsonMessages = (await import(`../messages/${locale}.json`)).default;

  // Deep-merge DB content overrides on top of JSON defaults
  let messages = jsonMessages;
  try {
    const { getCachedContentOverrides } = await import('@/actions/content');
    const overrides = await getCachedContentOverrides(locale);

    if (Object.keys(overrides).length > 0) {
      messages = { ...jsonMessages };
      for (const [namespace, keys] of Object.entries(overrides)) {
        if (messages[namespace]) {
          messages[namespace] = { ...messages[namespace], ...keys };
        }
      }
    }
  } catch {
    // DB unavailable — fall back to JSON defaults silently
  }

  return {
    locale,
    messages,
    timeZone: 'Asia/Kolkata',
  };
});
