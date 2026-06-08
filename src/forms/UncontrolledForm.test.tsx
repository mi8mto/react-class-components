import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UncontrolledForm } from './UncontrolledForm';

afterEach(() => {
  cleanup();
});

describe('UncontrolledForm', () => {
  it('renders form fields', () => {
    render(<UncontrolledForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<UncontrolledForm />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
