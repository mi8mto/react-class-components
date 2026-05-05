import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import type { Person } from '../../types/api';

describe('CardList component', () => {
  test('renders list of people', () => {
  const people: Person[] = [
  { name: 'Pikachu', gender: 'electric', url: 'test-url-1' },
  { name: 'Bulbasaur', gender: 'grass', url: 'test-url-2' },
];

    render(<CardList people={people} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  test('renders description (gender)', () => {
    const people: Person[] = [ { name: 'Charmander', gender: 'fire', url: 'test-url' },];

    render(<CardList people={people} />);

    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  test('renders fallback description when missing', () => {
    const people: Person[] = [ { name: 'Squirtle', url: 'test-url' }];

    render(<CardList people={people} />);

    expect(
      screen.getByText('No description available')
    ).toBeInTheDocument();
  });

  test('renders nothing when list is empty', () => {
    render(<CardList people={[]} />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});