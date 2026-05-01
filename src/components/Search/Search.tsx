// Search.tsx
import { Component } from 'react';

const STORAGE_KEY = 'searchTerm';

interface SearchState {
  searchTerm: string;
}

interface SearchProps {
  onSearch: (search: string) => void;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem(STORAGE_KEY);

    if (savedTerm) {
      this.setState({
        searchTerm: savedTerm,
      });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

handleSearch = () => {
  const trimmed = this.state.searchTerm.trim();

  if (!trimmed) return;

  localStorage.setItem(STORAGE_KEY, trimmed);

  this.props.onSearch(trimmed);
};

  render() {
    return (
      <div className="search-section">
        <input
          type="text"
          placeholder="Search characters..."
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />

        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}
