import type { ApiResponse } from '../types/api';

const BASE_URL = 'https://swapi.dev/api/people/';

export const fetchPeople = async (
  search: string,
  page: number = 1
): Promise<ApiResponse> => {
  const url = `${BASE_URL}?search=${search}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: ApiResponse = await response.json();

  return data;
};