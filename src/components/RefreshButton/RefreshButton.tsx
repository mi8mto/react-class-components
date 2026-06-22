'use client';

import { useTranslations } from 'next-intl';
import { useQueryClient } from '@tanstack/react-query';

export const RefreshButton = () => {
  const t = useTranslations('Buttons');
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['pokemon'] });
    queryClient.invalidateQueries({ queryKey: ['pokemon-details'] });
  };

  return (
    <button type="button" onClick={handleRefresh} className="search-button">
      {t('refresh')}
    </button>
  );
};
