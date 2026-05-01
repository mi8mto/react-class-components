import { Component } from 'react';
import './Spinner.css';

export class Spinner extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
}