import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue = '') => {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string) => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue] as const;
};