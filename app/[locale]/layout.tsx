import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Providers } from '../../src/providers/providers';
import { LanguageSwitcher } from '../../src/components/LanguageSwitcher/LanguageSwitcher';
import { ThemeToggle } from '../../src/components/ThemeToggle/ThemeToggle';
import { Link } from '../../src/i18n/navigation';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <header className="app-header">
          <nav className="app-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>

            <LanguageSwitcher />
            <ThemeToggle />
          </nav>
        </header>

        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
