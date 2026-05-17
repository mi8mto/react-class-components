import type { Pokemon } from '../../types/api';

interface CardListProps {
  pokemonList: Pokemon[];
}

const getPokemonId = (url: string): string => {
  const segments = url.replace(/\/$/, '').split('/');
  return segments[segments.length - 1];
};

export const CardList = ({ pokemonList }: CardListProps) => {
  return (
    <>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.name} className="card">
          <h3>{pokemon.name}</h3>
          <p className="card-description">Pokemon #{getPokemonId(pokemon.url)}</p>
        </div>
      ))}
    </>
  );
};