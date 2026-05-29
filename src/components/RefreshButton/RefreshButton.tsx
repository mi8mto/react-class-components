import { useQueryClient } from '@tanstack/react-query';

export const RefreshButton = () => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['pokemon'] });
  };

  queryClient.invalidateQueries({ queryKey: ['pokemon-details'] });

  return (
    <button type="button" onClick={handleRefresh}>
      Refresh
    </button>
  );
};
