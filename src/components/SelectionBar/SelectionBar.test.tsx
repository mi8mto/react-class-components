import { fireEvent, render, screen } from '@testing-library/react';

import { beforeEach, describe, expect, test } from 'vitest';

import { SelectionBar } from './SelectionBar';
import { usePokemonStore } from '../../store/pokemonStore';

describe('SelectionBar component', () => {
  beforeEach(() => {
    usePokemonStore.setState({
      selectedPokemons: [],
    });
  });

  test('does not render when no pokemons selected', () => {
    render(<SelectionBar />);

    expect(screen.queryByText(/selected pokemons/i)).not.toBeInTheDocument();
  });

  test('renders selected pokemons count', () => {
    usePokemonStore.getState().selectPokemon({
      id: '25',
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    });

    render(<SelectionBar />);

    expect(screen.getByText(/selected pokemons: 1/i)).toBeInTheDocument();
  });

  test('clears selected pokemons', () => {
    usePokemonStore.getState().selectPokemon({
      id: '25',
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    });

    render(<SelectionBar />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /unselect all/i,
      })
    );

    expect(usePokemonStore.getState().selectedPokemons).toHaveLength(0);
  });

  test('downloads selected pokemons as csv', async () => {
    usePokemonStore.getState().selectPokemon({
      id: '25',
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    });

    const fetchMock = vi.fn().mockResolvedValue({
      blob: () => Promise.resolve(new Blob(['csv'])),
    });

    global.fetch = fetchMock as typeof fetch;

    render(<SelectionBar />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /download/i,
      })
    );

    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/export-csv',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });
});
