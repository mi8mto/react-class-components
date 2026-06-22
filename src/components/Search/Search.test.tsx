import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Search } from './Search';
import { TestProviders } from '../../test/TestProviders';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders input and button', () => {
    render(
      <TestProviders>
        <Search onSearch={vi.fn()} />
      </TestProviders>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('loads value from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'Luke');

    render(
      <TestProviders>
        <Search onSearch={vi.fn()} />
      </TestProviders>
    );

    expect(screen.getByRole('textbox')).toHaveValue('Luke');
  });

  test('updates input value when typing', () => {
    render(
      <TestProviders>
        <Search onSearch={vi.fn()} />
      </TestProviders>
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Yoda' } });

    expect(input).toHaveValue('Yoda');
  });

  test('calls onSearch with trimmed value', () => {
    const onSearch = vi.fn();

    render(
      <TestProviders>
        <Search onSearch={onSearch} />
      </TestProviders>
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '  Vader  ' } });
    fireEvent.click(screen.getByRole('button'));

    expect(onSearch).toHaveBeenCalledWith('Vader');
  });

  test('saves trimmed value to localStorage', () => {
    const onSearch = vi.fn();

    render(
      <TestProviders>
        <Search onSearch={onSearch} />
      </TestProviders>
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '  Leia  ' } });
    fireEvent.click(screen.getByRole('button'));

    expect(localStorage.getItem('searchTerm')).toBe('Leia');
  });

  test('does not call onSearch if input is empty', () => {
    const onSearch = vi.fn();

    render(
      <TestProviders>
        <Search onSearch={onSearch} />
      </TestProviders>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onSearch).not.toHaveBeenCalled();
  });

  test('does not call onSearch if value did not change', () => {
    const onSearch = vi.fn();

    render(
      <TestProviders>
        <Search onSearch={onSearch} />
      </TestProviders>
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByRole('button'));

    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
