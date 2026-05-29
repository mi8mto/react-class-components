interface PokemonCsvItem {
  name: string;
  url: string;
}

export const downloadCsv = (pokemons: PokemonCsvItem[]) => {
  const headers = ['Name', 'Pokemon URL'];

  const rows = pokemons.map(({ name, url }) => [name, url]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const fileUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = fileUrl;
  link.download = `${pokemons.length}_items.csv`;

  document.body.append(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(fileUrl);
};
