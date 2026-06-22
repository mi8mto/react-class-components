interface PokemonCsvItem {
  name: string;
  url: string;
}

export const downloadCsv = async (
  pokemons: PokemonCsvItem[]
): Promise<void> => {
  const response = await fetch('/api/export-csv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokemons),
  });

  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;
  link.download = `${pokemons.length}_items.csv`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
};
