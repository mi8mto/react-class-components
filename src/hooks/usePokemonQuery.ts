import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '../services/api';

export const usePokemonQuery = (search: string, page: number) => {
  return useQuery({
    queryKey: ['pokemon', search, page],
    queryFn: () => fetchPokemon(search, page),
  });
};
