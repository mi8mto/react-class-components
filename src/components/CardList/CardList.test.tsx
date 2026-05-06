import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import type { Pokemon } from '../../types/api';

describe('CardList component', () => {
  test('renders list of pokemon', () => {
    const pokemonList: Pokemon[] = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];

    render(<CardList pokemonList={pokemonList} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('renders pokemon description with ID', () => {
    const pokemonList: Pokemon[] = [
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ];

    render(<CardList pokemonList={pokemonList} />);

    expect(screen.getByText('Pokemon #4')).toBeInTheDocument();
  });

  test('renders nothing when list is empty', () => {
    render(<CardList pokemonList={[]} />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
