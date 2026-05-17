import { fetchPokemon, fetchPokemonDetails } from './api';

describe('api service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('fetchPokemon returns pokemon list', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 1,
        results: [{ name: 'pikachu', url: 'test-url' }],
      }),
    } as Response);

    const result = await fetchPokemon('');

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
    );

    expect(result).toEqual({
      count: 1,
      results: [{ name: 'pikachu', url: 'test-url' }],
    });
  });

  test('fetchPokemon uses page number to calculate offset', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 0,
        results: [],
      }),
    } as Response);

    await fetchPokemon('', 3);

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    );
  });

  test('fetchPokemon filters pokemon by search term', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 2,
        results: [
          { name: 'pikachu', url: 'test-url-1' },
          { name: 'bulbasaur', url: 'test-url-2' },
        ],
      }),
    } as Response);

    const result = await fetchPokemon('pika');

    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
    );

    expect(result).toEqual({
      count: 2,
      results: [{ name: 'pikachu', url: 'test-url-1' }],
    });
  });

  test('fetchPokemon throws error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(fetchPokemon('')).rejects.toThrow('Failed to fetch data');
  });

  test('fetchPokemonDetails returns pokemon details', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        base_experience: 112,
        sprites: {
          front_default: 'pikachu.png',
        },
        types: [
          {
            type: {
              name: 'electric',
            },
          },
        ],
      }),
    } as Response);

    const result = await fetchPokemonDetails('25');

    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');

    expect(result).toEqual({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      sprites: {
        front_default: 'pikachu.png',
      },
      types: [
        {
          type: {
            name: 'electric',
          },
        },
      ],
    });
  });

  test('fetchPokemonDetails throws error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(fetchPokemonDetails('25')).rejects.toThrow(
      'Failed to fetch pokemon details'
    );
  });
});
