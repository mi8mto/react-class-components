import { usePokemonStore } from '../../store/pokemonStore';
import { downloadCsv } from '../../utils/downloadCsv';

export const SelectionBar = () => {
  const { selectedPokemons, clearSelectedPokemons } = usePokemonStore();

  const handleDownload = async () => {
    await downloadCsv(selectedPokemons);
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
