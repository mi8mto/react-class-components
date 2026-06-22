import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('Errors');

  return (
    <main>
      <h1>404</h1>
      <p>{t('pageNotFound')}</p>
    </main>
  );
}
