import type { MouseEvent } from 'react';
import type { Pokemon } from '../../types/api';

interface CardListProps {
  pokemonList: Pokemon[];
  onPokemonSelect: (pokemonId: string) => void;
}

const getPokemonId = (url: string): string => {
  const segments = url.replace(/\/$/, '').split('/');
  return segments[segments.length - 1];
};

export const CardList = ({ pokemonList, onPokemonSelect }: CardListProps) => {
  const handleCardClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const pokemonId = event.currentTarget.dataset.pokemonId;

    if (pokemonId) {
      onPokemonSelect(pokemonId);
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
            <h3>{pokemon.name}</h3>
            <p className="card-description">Pokemon #{pokemonId}</p>
          </button>
        );
      })}
    </>
  );
};
