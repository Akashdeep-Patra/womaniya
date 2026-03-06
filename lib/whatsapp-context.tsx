'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type WhatsAppPageContext =
  | { type: 'general' }
  | { type: 'product'; name: string; price: string | number; sku?: string | null }
  | { type: 'shop'; category?: string }
  | { type: 'category'; name: string }
  | { type: 'about' };

type WhatsAppCtx = {
  pageContext: WhatsAppPageContext;
  setPageContext: (ctx: WhatsAppPageContext) => void;
};

const Context = createContext<WhatsAppCtx>({
  pageContext: { type: 'general' },
  setPageContext: () => {},
});

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [pageContext, setPageContext] = useState<WhatsAppPageContext>({ type: 'general' });
  const value = useMemo(() => ({ pageContext, setPageContext }), [pageContext]);
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export function useWhatsAppContext() {
  return useContext(Context);
}

/**
 * Drop this into any server-rendered page to set the floating WhatsApp
 * button's message context. Resets to 'general' on unmount.
 *
 * Uses JSON.stringify for stable dependency comparison so inline object
 * literals don't cause infinite re-renders.
 */
export function WhatsAppContextSetter({ context }: { context: WhatsAppPageContext }) {
  const { setPageContext } = useWhatsAppContext();
  const serialized = JSON.stringify(context);

  useEffect(() => {
    setPageContext(JSON.parse(serialized));
    return () => setPageContext({ type: 'general' });
  }, [serialized, setPageContext]);

  return null;
}
