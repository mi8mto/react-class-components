import { Component } from 'react';
import { Search } from './components/Search/Search';
import { CardList } from './components/CardList/CardList';
import { fetchPokemon } from './services/api';
import type { Pokemon } from './types/api';
import { Spinner } from './components/Spinner/Spinner';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import './App.css';

interface AppState {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      pokemonList: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm');

    if (savedTerm) {
      this.loadPokemon(savedTerm);
    } else {
      this.loadPokemon('');
    }
  }

  loadPokemon = async (search: string) => {
    try {
      this.setState({
        loading: true,
        error: null,
      });

      await new Promise((resolve) => setTimeout(resolve, 300));

      const data = await fetchPokemon(search);

      this.setState({
        pokemonList: data.results,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      this.setState({
        error: 'Failed to load data',
        loading: false,
      });
    }
  };

  render() {
    const { pokemonList, loading, error } = this.state;

    return (
      <div className="app-container">
        <Search onSearch={this.loadPokemon} />
        <div className="results-section">
          {loading && <Spinner />}

          {error && <ErrorMessage message={error} />}

          {!loading && !error && pokemonList.length > 0 && (
            <CardList pokemonList={pokemonList} />
          )}

          {!loading && !error && pokemonList.length === 0 && (
            <p>No results found</p>
          )}
        </div>
        <ErrorButton />
      </div>
    );
  }
}

export default App;
