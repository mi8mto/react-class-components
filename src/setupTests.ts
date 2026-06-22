import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

/* ---------------- next/navigation ---------------- */
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

/* ---------------- next-intl ---------------- */
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,

  useTranslations: () => (key: string) => key,
}));

vi.mock('next-intl/server', () => ({
  getMessages: async () => ({}),
  getTranslations: async () => (namespace: string) => namespace,
}));

/* ---------------- next/image ---------------- */
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', props),
}));
