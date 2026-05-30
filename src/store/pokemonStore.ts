import { create } from 'zustand';

interface SelectedPokemon {
  id: string;
  name: string;
  url: string;
}

interface PokemonStore {
  selectedPokemons: SelectedPokemon[];
  selectPokemon: (pokemon: SelectedPokemon) => void;
  unselectPokemon: (pokemonId: string) => void;
  clearSelectedPokemons: () => void;
  isPokemonSelected: (pokemonId: string) => boolean;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  selectedPokemons: [],

  selectPokemon: (pokemon) =>
    set((state) => ({
      selectedPokemons: [...state.selectedPokemons, pokemon],
    })),

  unselectPokemon: (pokemonId) =>
    set((state) => ({
      selectedPokemons: state.selectedPokemons.filter(
        (pokemon) => pokemon.id !== pokemonId
      ),
    })),

  clearSelectedPokemons: () =>
    set({
      selectedPokemons: [],
    }),

  isPokemonSelected: (pokemonId) =>
    get().selectedPokemons.some((pokemon) => pokemon.id === pokemonId),
}));
