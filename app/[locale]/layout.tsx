import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '../../src/providers/providers';
import { getMessages } from 'next-intl/server';
import { Link } from '../../src/i18n/navigation';
import { ThemeToggle } from '../../src/components/ThemeToggle/ThemeToggle';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <header className="app-header">
          <nav className="app-nav" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>

            <ThemeToggle />
          </nav>
        </header>

        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
