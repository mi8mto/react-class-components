import type { ApiResponse } from '../types/api';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPeople = async (
  search: string,
  page: number = 1
): Promise<ApiResponse> => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: ApiResponse = await response.json();

  return data;
};