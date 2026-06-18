import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link> <Link href="/about">About</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
