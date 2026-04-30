import { Component } from 'react';
import { Search } from './components/Search/Search';
import { CardList } from './components/CardList/CardList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        {/* Top Section */}
        <Search />

        {/* Bottom Section */}
        <CardList />
      </div>
    );
  }
}

export default App;
