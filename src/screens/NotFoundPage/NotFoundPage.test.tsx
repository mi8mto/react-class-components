import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage component', () => {
  test('renders 404 message and link back to main page', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /back to main page/i })
    ).toHaveAttribute('href', '/?page=1');
  });
});
