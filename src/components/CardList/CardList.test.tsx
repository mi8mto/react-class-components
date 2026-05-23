import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CardList } from './CardList';
import type { Pokemon } from '../../types/api';

describe('CardList component', () => {
  const onPokemonSelect = vi.fn();

  test('renders list of pokemon', () => {
    const pokemonList: Pokemon[] = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];

    render(
      <CardList pokemonList={pokemonList} onPokemonSelect={onPokemonSelect} />
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('renders pokemon description with ID', () => {
    const pokemonList: Pokemon[] = [
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ];

    render(
      <CardList pokemonList={pokemonList} onPokemonSelect={onPokemonSelect} />
    );

    expect(screen.getByText('Pokemon #4')).toBeInTheDocument();
  });

  test('renders nothing when list is empty', () => {
    render(<CardList pokemonList={[]} onPokemonSelect={onPokemonSelect} />);

    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });

  test('calls onPokemonSelect when card clicked', () => {
    const handlePokemonSelect = vi.fn();

    const pokemonList: Pokemon[] = [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    ];

    render(
      <CardList
        pokemonList={pokemonList}
        onPokemonSelect={handlePokemonSelect}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(handlePokemonSelect).toHaveBeenCalledWith('25');
  });
});
