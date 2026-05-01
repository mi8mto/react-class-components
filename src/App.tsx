
import { Component } from 'react';
import { Search } from './components/Search/Search';
import { CardList } from './components/CardList/CardList';
import { fetchPeople } from './services/api';
import type { Person } from './types/api';
import { Spinner } from './components/Spinner/Spinner';
import './App.css';

interface AppState {
  people: Person[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      people: [],
      loading: false,
      error: null,
    };
  }

componentDidMount() {
  setTimeout(() => {
    this.loadPeople('');
  }, 0);
}

loadPeople = async (search: string) => {
  try {
    this.setState({
      loading: true,
      error: null,
    });

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    const data = await fetchPeople(search);

    this.setState({
      people: data.results,
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
  const { people, loading, error } = this.state;

  return (
    <div className="app-container">
      <Search onSearch={this.loadPeople} />
      <div className="results-section">
        {loading && <Spinner />}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && people.length > 0 && (
          <CardList people={people} />
        )}

        {!loading && !error && people.length === 0 && (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

}

export default App;
