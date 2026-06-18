import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { usePokemonDetailsQuery } from '../../hooks';

export const PokemonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsId = searchParams.get('details');

  const {
    data: pokemonDetails,
    isLoading,
    error,
  } = usePokemonDetailsQuery(detailsId ?? '');
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

        {isLoading && <Spinner />}

        {error && <ErrorMessage message="Failed to load details" />}

        {!isLoading && !error && pokemonDetails && (
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
