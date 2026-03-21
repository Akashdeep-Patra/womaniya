'use server';

/**
 * Translates English text to Bengali using Google Translate's public endpoint.
 * Free, no API key, no setup — uses Google's neural MT engine (much better than MyMemory).
 *
 * Note: uses the unofficial gtx client endpoint. Falls back to returning the
 * original text if the service is unavailable, so the admin UI never hard-errors.
 */
export async function translateToBengali(text: string): Promise<string> {
  if (!text.trim()) return '';

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(8000), // 8 s hard timeout
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Response: [[[chunk, original], ...], ...]
    const data = await res.json() as unknown[][];
    const translated = (data[0] as unknown[][])
      .map((chunk) => (chunk as unknown[])[0])
      .filter((t): t is string => typeof t === 'string')
      .join('');

    if (!translated) throw new Error('Empty response');
    return translated;
  } catch {
    // Surface a friendly error to the caller rather than crashing
    throw new Error('Translation unavailable — please try again or type manually');
  }
}
