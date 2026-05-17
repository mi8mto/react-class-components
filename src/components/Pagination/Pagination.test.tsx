import { fireEvent, render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination component', () => {
  test('does not render when total pages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  test('renders page buttons when total pages is greater than 1', () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('calls onPageChange with selected page', () => {
    const handlePageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('2'));

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange when clicking next', () => {
    const handlePageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('Next'));

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange when clicking previous', () => {
    const handlePageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('Previous'));

    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  test('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={vi.fn()} />
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });
});
