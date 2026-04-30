import { Component } from 'react';

const STORAGE_KEY = 'searchTerm';

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<object, SearchState> {
  constructor(props: object) {
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

  render() {
    return (
      <div className="search-section">
        <input
          type="text"
          placeholder="Search characters..."
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />

        <button type="button">Search</button>
      </div>
    );
  }
}
