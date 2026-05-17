import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Search/Search';
import { CardList } from '../../components/CardList/CardList';
import { Pagination } from '../../components/Pagination/Pagination';
import { fetchPokemon } from '../../services/api';
import type { Pokemon } from '../../types/api';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton';

const SEARCH_STORAGE_KEY = 'searchTerm';
const ITEMS_PER_PAGE = 4;

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pageParam = searchParams.get('page');
  const detailsParam = searchParams.get('details');
  const currentPage = pageParam ? Number(pageParam) : 1;

  void detailsParam;

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(pokemonList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePokemonList = pokemonList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

  const handlePageChange = (page: number) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(page));

    setSearchParams(nextParams);
  };

  const handleSearch = (search: string) => {
    setSearchParams({ page: '1' });
    void loadPokemon(search);
  };

  const handlePokemonSelect = (pokemonId: string) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('page', String(currentPage));
    nextParams.set('details', pokemonId);

    navigate(`/details?${nextParams.toString()}`);
  };

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
      <Search onSearch={handleSearch} />

      <div className="content-layout">
        <main className="main-panel">
          <div className="results-section">
            {loading && <Spinner />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && pokemonList.length > 0 && (
              <>
                <CardList
                  pokemonList={visiblePokemonList}
                  onPokemonSelect={handlePokemonSelect}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}

            {!loading && !error && pokemonList.length === 0 && (
              <p>No results found</p>
            )}
          </div>
        </main>

        <Outlet />
      </div>

      <ErrorButton />
    </div>
  );
};
