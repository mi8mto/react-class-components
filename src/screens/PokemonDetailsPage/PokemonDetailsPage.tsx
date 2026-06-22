'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { usePokemonDetailsQuery } from '../../hooks';

export const PokemonDetailsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const t = useTranslations('PokemonDetails');
  const e = useTranslations('Errors');

  const detailsId = searchParams.get('details');

  const {
    data: pokemonDetails,
    isLoading,
    error,
  } = usePokemonDetailsQuery(detailsId ?? '');

  const handleClose = () => {
    const nextParams = new URLSearchParams(searchParams.toString());

    nextParams.delete('details');

    router.push(`?${nextParams.toString()}`);
  };

  return (
    <aside className="details-panel">
      <div className="details-card">
        <button
          type="button"
          className="details-close-button"
          onClick={handleClose}
          aria-label={t('close')}
        >
          ×
        </button>

        {isLoading && <Spinner />}

        {error && <ErrorMessage message={e('failedToLoadDetails')} />}

        {!isLoading && !error && pokemonDetails && (
          <div className="details-content">
            <h2>{pokemonDetails.name}</h2>

            {pokemonDetails.sprites.front_default && (
              <Image
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
                width={140}
                height={140}
                className="details-image"
              />
            )}

            <dl className="details-list">
              <div>
                <dt>ID</dt>
                <dd>{pokemonDetails.id}</dd>
              </div>

              <div>
                <dt>{t('height')}</dt>
                <dd>{pokemonDetails.height}</dd>
              </div>

              <div>
                <dt>{t('weight')}</dt>
                <dd>{pokemonDetails.weight}</dd>
              </div>

              <div>
                <dt>{t('baseExperience')}</dt>
                <dd>{pokemonDetails.base_experience}</dd>
              </div>

              <div>
                <dt>{t('types')}</dt>
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