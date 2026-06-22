import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';

export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider
      locale="en"
      messages={messages}
      timeZone="Europe/Moscow"
    >
      {children}
    </NextIntlClientProvider>
  );
};
