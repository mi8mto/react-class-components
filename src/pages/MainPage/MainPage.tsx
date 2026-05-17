import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Search/Search';
import { CardList } from '../../components/CardList/CardList';
import { fetchPokemon } from '../../services/api';
import type { Pokemon } from '../../types/api';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton';

const SEARCH_STORAGE_KEY = 'searchTerm';

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Number(pageParam) : 1;
  void currentPage;

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  if (!pageParam) {
    const timeoutId = window.setTimeout(() => {
      setSearchParams({ page: '1' }, { replace: true });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }

  return undefined;
}, [pageParam, setSearchParams]);

  const loadPokemon = useCallback(async (search: string) => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = await fetchPokemon(search);

      setPokemonList(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);

      setError('Failed to load data');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedTerm = localStorage.getItem(SEARCH_STORAGE_KEY) ?? '';

    const timeoutId = window.setTimeout(() => {
      void loadPokemon(savedTerm);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadPokemon]);

  return (
    <div className="app-container">
      <Search onSearch={loadPokemon} />

      <div className="results-section">
        {loading && <Spinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && pokemonList.length > 0 && (
          <CardList pokemonList={pokemonList} />
        )}

        {!loading && !error && pokemonList.length === 0 && (
          <p>No results found</p>
        )}
      </div>

      <ErrorButton />
    </div>
  );
};
