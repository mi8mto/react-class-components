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
  const { selectPokemon, unselectPokemon, isPokemonSelected } =
    usePokemonStore();
  const handleCardClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const pokemonId = event.currentTarget.dataset.pokemonId;

    if (pokemonId) {
      onPokemonSelect(pokemonId);
    }
  };

  const handleCheckboxClick = (
    event: MouseEvent<HTMLInputElement>,
    pokemonId: string,
    pokemonName: string,
    pokemonUrl: string
  ) => {
    event.stopPropagation();

    if (isPokemonSelected(pokemonId)) {
      unselectPokemon(pokemonId);
      return;
    }

    selectPokemon({
      id: pokemonId,
      name: pokemonName,
      url: pokemonUrl,
    });
  };

  return (
    <>
      {pokemonList.map(({ name, url }) => {
        const pokemonId = getPokemonId(url);

        return (
          <button
            key={name}
            type="button"
            className="card"
            data-pokemon-id={pokemonId}
            onClick={handleCardClick}
          >
            <div className="card-header">
              <h3>{name}</h3>

              <input
                type="checkbox"
                className="card-checkbox"
                checked={isPokemonSelected(pokemonId)}
                onClick={(event) =>
                  handleCheckboxClick(event, pokemonId, name, url)
                }
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
