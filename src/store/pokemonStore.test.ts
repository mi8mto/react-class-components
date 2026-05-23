import { beforeEach, describe, expect, test } from 'vitest';

import { usePokemonStore } from './pokemonStore';

describe('pokemonStore', () => {
  beforeEach(() => {
    usePokemonStore.setState({
      selectedPokemons: [],
    });
  });

  test('adds pokemon to selectedPokemons', () => {
    usePokemonStore.getState().selectPokemon({
      id: '25',
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    });

    const { selectedPokemons } = usePokemonStore.getState();

    expect(selectedPokemons).toHaveLength(1);

    expect(selectedPokemons[0].name).toBe('pikachu');
  });

  test('removes pokemon from selectedPokemons', () => {
    usePokemonStore.getState().selectPokemon({
      id: '25',
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    });

    usePokemonStore.getState().unselectPokemon('25');

    const { selectedPokemons } = usePokemonStore.getState();

    expect(selectedPokemons).toHaveLength(0);
  });

  test('clears all selected pokemons', () => {
    usePokemonStore.getState().selectPokemon({
      id: '25',
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    });

    usePokemonStore.getState().selectPokemon({
      id: '1',
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    });

    usePokemonStore.getState().clearSelectedPokemons();

    const { selectedPokemons } = usePokemonStore.getState();

    expect(selectedPokemons).toHaveLength(0);
  });
});
