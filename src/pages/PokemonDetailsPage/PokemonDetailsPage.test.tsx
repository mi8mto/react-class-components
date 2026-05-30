import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonDetailsPage } from './PokemonDetailsPage';
import * as api from '../../services/api';

vi.mock('../../services/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderPokemonDetailsPage = (initialEntry: string) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/details" element={<PokemonDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('PokemonDetailsPage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads and renders pokemon details', async () => {
    vi.mocked(api.fetchPokemonDetails).mockResolvedValue({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      sprites: {
        front_default: 'pikachu.png',
      },
      types: [
        {
          type: {
            name: 'electric',
          },
        },
      ],
    });

    renderPokemonDetailsPage('/details?page=1&details=25');

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /pikachu/i })
      ).toBeInTheDocument();
    });

    expect(api.fetchPokemonDetails).toHaveBeenCalledWith('25');
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  test('renders error message when details request fails', async () => {
    vi.mocked(api.fetchPokemonDetails).mockRejectedValue(
      new Error('API error')
    );

    renderPokemonDetailsPage('/details?page=1&details=25');

    await waitFor(() => {
      expect(screen.getByText(/failed to load details/i)).toBeInTheDocument();
    });
  });

  test('does not fetch details when details param is missing', () => {
    renderPokemonDetailsPage('/details?page=1');

    expect(api.fetchPokemonDetails).not.toHaveBeenCalled();
  });
});
