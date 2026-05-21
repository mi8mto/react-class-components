import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchPokemonDetails, type PokemonDetails } from '../../services/api';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

export const PokemonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsId = searchParams.get('details');

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [loading, setLoading] = useState(Boolean(detailsId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) {
      return;
    }

    const loadDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchPokemonDetails(detailsId);

        setPokemonDetails(data);
      } catch (error) {
        console.error(error);

        setError('Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    void loadDetails();
  }, [detailsId]);

  const handleClose = () => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete('details');

    navigate(`/?${nextParams.toString()}`);
  };

  return (
    <aside className="details-panel">
      <div className="details-card">
        <button
          type="button"
          className="details-close-button"
          onClick={handleClose}
          aria-label="Close details"
        >
          ×
        </button>

        {loading && <Spinner />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && pokemonDetails && (
          <div className="details-content">
            <h2>{pokemonDetails.name}</h2>

            {pokemonDetails.sprites.front_default && (
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
                className="details-image"
              />
            )}

            <dl className="details-list">
              <div>
                <dt>ID</dt>
                <dd>{pokemonDetails.id}</dd>
              </div>

              <div>
                <dt>Height</dt>
                <dd>{pokemonDetails.height}</dd>
              </div>

              <div>
                <dt>Weight</dt>
                <dd>{pokemonDetails.weight}</dd>
              </div>

              <div>
                <dt>Base experience</dt>
                <dd>{pokemonDetails.base_experience}</dd>
              </div>

              <div>
                <dt>Types</dt>
                <dd>
                  {pokemonDetails.types.map(({ type }) => type.name).join(', ')}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </aside>
  );
};
