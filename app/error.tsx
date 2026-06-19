'use client';

export default function Error({ error }: { error: Error; reset: () => void }) {
  console.error(error);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong.</h2>
      <p>Please reload the page.</p>
    </div>
  );
}
