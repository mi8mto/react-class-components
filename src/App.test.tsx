import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import * as api from './services/api';
import type { ApiResponse } from './types/api';

vi.mock('./services/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderApp = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('shows loading initially', () => {
    renderApp();

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test('fetches and displays pokemon', async () => {
    const mockData: ApiResponse = {
      count: 1,
      results: [{ name: 'pikachu', url: 'test-url' }],
    };

    vi.mocked(api.fetchPokemon).mockResolvedValue(mockData);

    renderApp();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  test('uses search term from localStorage on load', async () => {
    localStorage.setItem('searchTerm', 'pikachu');

    vi.mocked(api.fetchPokemon).mockResolvedValue({
      count: 0,
      results: [],
    });

    renderApp();

    await waitFor(() => {
      expect(api.fetchPokemon).toHaveBeenCalledWith('pikachu', 1);
    });
  });

  test('shows error message when API fails', async () => {
    vi.mocked(api.fetchPokemon).mockRejectedValue(new Error('API error'));

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  test('shows "No results found" when empty response', async () => {
    vi.mocked(api.fetchPokemon).mockResolvedValue({
      count: 0,
      results: [],
    });

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
