import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage component', () => {
  test('renders author information and course link', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/author: Ihar Manakhau/i)).toBeInTheDocument();

    const courseLink = screen.getByRole('link', {
      name: /rs school react course/i,
    });

    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );

    expect(
      screen.getByRole('link', { name: /back to main page/i })
    ).toHaveAttribute('href', '/?page=1');
  });
});
