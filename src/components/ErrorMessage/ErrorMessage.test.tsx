import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  test('renders provided message', () => {
    render(<ErrorMessage message="Test error" />);

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});