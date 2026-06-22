import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { PokemonDetailsPage } from './PokemonDetailsPage';
import { TestProviders } from '../../test/TestProviders';

/* ---------------- MOCKS ---------------- */

const pushMock = vi.fn();

const mockHookValue = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'details' ? '25' : null),
    toString: () => 'page=1&details=25',
  }),
}));

vi.mock('../../hooks', () => ({
  usePokemonDetailsQuery: () => mockHookValue(),
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', props),
}));

/* ---------------- TESTS ---------------- */

describe('PokemonDetailsPage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderPage = () =>
    render(
      <TestProviders>
        <PokemonDetailsPage />
      </TestProviders>
    );

  test('loads and renders pokemon details', () => {
    mockHookValue.mockReturnValue({
      data: {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        base_experience: 112,
        sprites: {
          front_default: 'pikachu.png',
        },
        types: [{ type: { name: 'electric' } }],
      },
      isLoading: false,
      error: null,
    });

    renderPage();

    expect(
      screen.getByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();

    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );

    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  test('renders error message when details request fails', () => {
    mockHookValue.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('API error'),
    });

    renderPage();

    expect(screen.getByText('failedToLoadDetails')).toBeInTheDocument();
  });
});
