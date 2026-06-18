import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Link } from '../../src/i18n/navigation';

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <header>
        <nav>
          <Link href="/">Home</Link> <Link href="/about">About</Link>
        </nav>
      </header>

      {children}
    </NextIntlClientProvider>
  );
}
