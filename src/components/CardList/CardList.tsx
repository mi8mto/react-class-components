import { Component } from 'react';
import type { Pokemon } from '../../types/api';

interface CardListProps {
  pokemonList: Pokemon[];
}

export class CardList extends Component<CardListProps> {
  private getPokemonId(url: string): string {
    const segments = url.replace(/\/$/, '').split('/');
    return segments[segments.length - 1];
  }

  render() {
    const { pokemonList } = this.props;

    return (
      <>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="card">
            <h3>{pokemon.name}</h3>
            <p className="card-description">
              Pokemon #{this.getPokemonId(pokemon.url)}
            </p>
          </div>
        ))}
      </>
    );
  }
}
