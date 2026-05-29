import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../services/api';

export const usePokemonDetailsQuery = (pokemonId: string) => {
  return useQuery({
    queryKey: ['pokemon-details', pokemonId],
    queryFn: () => fetchPokemonDetails(pokemonId),
    enabled: Boolean(pokemonId),
  });
};
