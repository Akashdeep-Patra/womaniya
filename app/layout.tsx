// Root layout — pass-through shell; [locale]/layout.tsx owns <html> and <body>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
