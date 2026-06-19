'use client';
import { useState } from 'react';
// import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Search/Search';
import { CardList } from '../../components/CardList/CardList';
import { Pagination } from '../../components/Pagination/Pagination';
import { usePokemonQuery } from '../../hooks';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
// import { ErrorButton } from '../../components/ErrorButton/ErrorButton';
import { SelectionBar } from '../../components/SelectionBar/SelectionBar';
import { RefreshButton } from '../../components/RefreshButton/RefreshButton';

const SEARCH_STORAGE_KEY = 'searchTerm';
const ITEMS_PER_PAGE = 4;

export const MainPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  // const pageParam = searchParams.get('page');
  // const detailsParam = searchParams.get('details');
  // const currentPage = pageParam ? Number(pageParam) : 1;

  const currentPage = 1;
  // const detailsParam = null;

  // const [searchTerm, setSearchTerm] = useState(
  //   () => localStorage.getItem(SEARCH_STORAGE_KEY) ?? ''
  // );

  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return localStorage.getItem(SEARCH_STORAGE_KEY) ?? '';
  });

  const { data, isLoading, error } = usePokemonQuery(searchTerm, currentPage);

  const pokemonList = data?.results ?? [];

  const totalPages = Math.ceil(pokemonList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePokemonList = pokemonList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // useEffect(() => {
  //   if (!pageParam) {
  //     setSearchParams({ page: '1' }, { replace: true });
  //   }
  // }, [pageParam, setSearchParams]);

  // const handlePageChange = (page: number) => {
  //   const nextParams = new URLSearchParams(searchParams);
  //   nextParams.set('page', String(page));
  //   nextParams.delete('details');
  //   navigate(`/?${nextParams.toString()}`);
  // };

  const handlePageChange = () => {};

  const handleSearch = (search: string) => {
    setSearchTerm(search);
  };

  // const handlePokemonSelect = (pokemonId: string) => {
  //   const nextParams = new URLSearchParams(searchParams);
  //   nextParams.set('page', String(currentPage));
  //   nextParams.set('details', pokemonId);
  //   navigate(`/details?${nextParams.toString()}`);
  // };

  const handlePokemonSelect = () => {};

  // const handleCloseDetails = () => {
  //   if (!detailsParam) {
  //     return;
  //   }
  //   const nextParams = new URLSearchParams(searchParams);
  //   nextParams.delete('details');
  //   navigate(`/?${nextParams.toString()}`);
  // };

  const handleCloseDetails = () => {};

  return (
    <div className="app-container">
      <div className="search-controls">
        <Search onSearch={handleSearch} />
        <RefreshButton />
      </div>

      <div className="content-layout">
        <main className="main-panel" onClick={handleCloseDetails}>
          <div className="results-section">
            {isLoading && <Spinner />}

            {error && <ErrorMessage message="Failed to load data" />}

            {!isLoading && !error && pokemonList.length > 0 && (
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

            {!isLoading && !error && pokemonList.length === 0 && (
              <p>No results found</p>
            )}
          </div>
        </main>
        {/* <Outlet /> */}
      </div>

      <SelectionBar />
      {/* <ErrorButton /> */}
    </div>
  );
};
