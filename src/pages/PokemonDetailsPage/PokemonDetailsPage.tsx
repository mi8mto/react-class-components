import { useSearchParams } from 'react-router-dom';

export const PokemonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  return (
    <aside className="details-panel">
      <div className="details-card">
        <h2>Pokemon details</h2>
        <p>Selected Pokemon ID: {detailsId}</p>
      </div>
    </aside>
  );
};
