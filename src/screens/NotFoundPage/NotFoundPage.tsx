import Link from 'next/link';

export const NotFoundPage = () => {
  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Page not found</p>
      <Link href="/?page=1">Back to main page</Link>
    </main>
  );
};
