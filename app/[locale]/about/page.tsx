// app\[locale]\about\page.tsx
import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  return (
    <main>
      <h1>{t('title')}</h1>

      <p>{t('author')}: Ihar Manakhau</p>

      <p>This application was created as part of the RS School React course.</p>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        RS School React Course
      </a>
    </main>
  );
}
