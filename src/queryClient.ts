import { QueryClient } from '@tanstack/react-query';

const CACHE_TTL = Number(import.meta.env.VITE_QUERY_CACHE_TTL || 60000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
      retry: 1,
    },
  },
});
