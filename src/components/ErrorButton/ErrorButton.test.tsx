import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton', () => {
  test('renders button', () => {
    render(<ErrorButton />);
    expect(screen.getByText(/trigger error/i)).toBeInTheDocument();
  });

  test('throws error after click', () => {
    render(<ErrorButton />);

    const button = screen.getByText(/trigger error/i);

    // первый клик вызывает setState → второй рендер бросает ошибку
    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test error triggered');
  });
});