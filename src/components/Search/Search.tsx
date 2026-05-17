import { useRef, useState } from 'react';

const STORAGE_KEY = 'searchTerm';

interface SearchProps {
  onSearch: (search: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const savedSearchTerm = localStorage.getItem(STORAGE_KEY) ?? '';

  const [searchTerm, setSearchTerm] = useState(savedSearchTerm);
  const lastSearch = useRef(savedSearchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();

    if (!trimmed || trimmed === lastSearch.current) return;

    lastSearch.current = trimmed;

    localStorage.setItem(STORAGE_KEY, trimmed);

    onSearch(trimmed);
  };

  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />

      <button type="button" onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};