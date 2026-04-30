import { Component } from 'react';

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
