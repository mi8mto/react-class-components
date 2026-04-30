import { Component } from 'react';
import { Search } from './components/Search/Search';
import { CardList } from './components/CardList/CardList';
import { fetchPeople } from './services/api';
import type { Person } from './types/api';
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
    this.loadPeople('');
  }

  loadPeople = async (search: string) => {
    try {
      this.setState({
        loading: true,
        error: null,
      });

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
        <Search />

        {loading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        <CardList people={people} />
      </div>
    );
  }
}

export default App;