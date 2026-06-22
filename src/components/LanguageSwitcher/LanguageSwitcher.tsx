'use client';

import { usePathname, useRouter } from '../../i18n/navigation';

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => router.replace(pathname, { locale: 'en' })}
      >
        EN
      </button>

      <button
        type="button"
        className="theme-toggle"
        onClick={() => router.replace(pathname, { locale: 'ru' })}
      >
        RU
      </button>
    </>
  );
};
