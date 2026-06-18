import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';

describe('AboutPage component', () => {
  test('renders author information and course link', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/author: ihar manakhau/i)).toBeInTheDocument();

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
