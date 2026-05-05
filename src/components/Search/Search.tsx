import { Component } from 'react';

const STORAGE_KEY = 'searchTerm';

interface SearchState {
  searchTerm: string;
}

interface SearchProps {
  onSearch: (search: string) => void;
}

export class Search extends Component<SearchProps, SearchState> {
  private lastSearch = '';

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

      this.lastSearch = savedTerm;
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleSearch = () => {
    const trimmed = this.state.searchTerm.trim();

    // ❗ защита от пустого значения и повторного запроса
    if (!trimmed || trimmed === this.lastSearch) return;

    this.lastSearch = trimmed;

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
          className="search-input"
        />

        <button
          type="button"
          onClick={this.handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>
    );
  }
}