'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocalStorage } from '../../hooks';

const STORAGE_KEY = 'searchTerm';

interface SearchProps {
  onSearch: (search: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const t = useTranslations('Search');

  const [searchTerm, setSearchTerm] = useLocalStorage(STORAGE_KEY);

  const lastSearch = useRef('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();

    if (!trimmed) return;

    if (trimmed === lastSearch.current) return;

    lastSearch.current = trimmed;

    setSearchTerm(trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="search-section">
      <input
        type="text"
        placeholder={t('placeholder')}
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />

      <button type="button" onClick={handleSearch} className="search-button">
        {t('button')}
      </button>
    </div>
  );
};
