import { Component } from 'react';
import type { Person } from '../../types/api';

interface CardListProps {
  people: Person[];
}

export class CardList extends Component<CardListProps> {
  render() {
    const { people } = this.props;

    return (
      <div className="results-section">
        {people.map((person) => (
          <div key={person.name} className="card">
            <h3>{person.name}</h3>
          </div>
        ))}
      </div>
    );
  }
}