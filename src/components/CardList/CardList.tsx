import type { MouseEvent } from 'react';
import type { Pokemon } from '../../types/api';
import { usePokemonStore } from '../../store/pokemonStore';

interface CardListProps {
  pokemonList: Pokemon[];
  onPokemonSelect: (pokemonId: string) => void;
}

const getPokemonId = (url: string): string => {
  const segments = url.replace(/\/$/, '').split('/');

  return segments[segments.length - 1];
};

export const CardList = ({ pokemonList, onPokemonSelect }: CardListProps) => {
  const { selectedPokemons, selectPokemon, unselectPokemon } =
    usePokemonStore();

  const handleCardClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const pokemonId = event.currentTarget.dataset.pokemonId;

    if (pokemonId) {
      onPokemonSelect(pokemonId);
    }
  };

  const handleCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const pokemonId = event.currentTarget.dataset.pokemonId;
    const pokemonName = event.currentTarget.dataset.pokemonName;
    const pokemonUrl = event.currentTarget.dataset.pokemonUrl;

    if (!pokemonId || !pokemonName || !pokemonUrl) {
      return;
    }

    const isSelected = selectedPokemons.some(
      (pokemon) => pokemon.id === pokemonId
    );

    if (isSelected) {
      unselectPokemon(pokemonId);
    } else {
      selectPokemon({
        id: pokemonId,
        name: pokemonName,
        url: pokemonUrl,
      });
    }
  };

  return (
    <>
      {pokemonList.map((pokemon) => {
        const pokemonId = getPokemonId(pokemon.url);

        return (
          <button
            key={pokemon.name}
            type="button"
            className="card"
            data-pokemon-id={pokemonId}
            onClick={handleCardClick}
          >
            <div className="card-header">
              <h3>{pokemon.name}</h3>

              <input
                type="checkbox"
                className="card-checkbox"
                checked={selectedPokemons.some(
                  (selectedPokemon) => selectedPokemon.id === pokemonId
                )}
                data-pokemon-id={pokemonId}
                data-pokemon-name={pokemon.name}
                data-pokemon-url={pokemon.url}
                onClick={handleCheckboxClick}
                readOnly
              />
            </div>

            <p className="card-description">Pokemon #{pokemonId}</p>
          </button>
        );
      })}
    </>
  );
};
