import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders input and button', () => {
    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('loads value from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'Luke');

    render(<Search onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('Luke');
  });

  test('updates input value when typing', () => {
    render(<Search onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Yoda' } });

    expect(input).toHaveValue('Yoda');
  });

  test('calls onSearch with trimmed value', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '  Vader  ' } });
    fireEvent.click(screen.getByText('Search'));

    expect(onSearch).toHaveBeenCalledWith('Vader');
  });

  test('saves trimmed value to localStorage', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '  Leia  ' } });
    fireEvent.click(screen.getByText('Search'));

    expect(localStorage.getItem('searchTerm')).toBe('Leia');
  });

  test('does not call onSearch if input is empty', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    fireEvent.click(screen.getByText('Search'));

    expect(onSearch).not.toHaveBeenCalled();
  });

  test('does not call onSearch if value did not change', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(screen.getByText('Search'));

    fireEvent.click(screen.getByText('Search'));

    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
