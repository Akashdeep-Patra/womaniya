// Root layout — minimal shell; locale layout owns <html> and <body>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return children as any;
}
