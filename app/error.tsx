// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <main>
      <h1>Error</h1>
      <p>Something went wrong</p>

      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
