export async function POST(request: Request) {
  const pokemons = await request.json();

  const headers = ['Name', 'Pokemon URL'];

  const rows = pokemons.map((pokemon: { name: string; url: string }) => [
    pokemon.name,
    pokemon.url,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row: string[]) => row.join(',')),
  ].join('\n');

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="pokemons.csv"',
    },
  });
}
