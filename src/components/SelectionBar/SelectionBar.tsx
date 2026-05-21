import { usePokemonStore } from '../../store/pokemonStore';

export const SelectionBar = () => {
  const { selectedPokemons, clearSelectedPokemons } = usePokemonStore();

  const handleDownload = () => {
    const headers = ['Name', 'Pokemon URL'];

    const rows = selectedPokemons.map((pokemon) => [pokemon.name, pokemon.url]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = `${selectedPokemons.length}_items.csv`;

    document.body.append(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
  };

  if (selectedPokemons.length === 0) {
    return null;
  }

  return (
    <div className="selection-bar">
      <p>Selected pokemons: {selectedPokemons.length}</p>

      <div className="selection-bar-actions">
        <button type="button" onClick={clearSelectedPokemons}>
          Unselect all
        </button>

        <button type="button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
