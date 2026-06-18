import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/?page=1">Back to main page</Link>
    </main>
  );
};
