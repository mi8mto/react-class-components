import { Component } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

export class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div className="error-container">
        <p className="error-text">
         {this.props.message}
        </p>
      </div>
    );
  }
}