'use client';

import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue = '') => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);

    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  return [storedValue, setValue] as const;
};
