import userEvent from '@testing-library/user-event';
import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ReactHookForm } from './ReactHookForm';

afterEach(() => {
  cleanup();
});

describe('ReactHookForm', () => {
  it('renders form fields', () => {
    render(<ReactHookForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password$/i)).toBeInTheDocument();
  });

  it('submit button is disabled initially', () => {
    render(<ReactHookForm />);

    const button = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(button).toBeDisabled();
  });

  it('renders password strength indicators', () => {
    render(<ReactHookForm />);

    expect(screen.getByText(/number/i)).toBeInTheDocument();
    expect(screen.getByText(/uppercase/i)).toBeInTheDocument();
    expect(screen.getByText(/lowercase/i)).toBeInTheDocument();
    expect(screen.getByText(/special character/i)).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const user = userEvent.setup();

    render(<ReactHookForm />);

    await user.type(screen.getByLabelText(/full name/i), 'John Smith');

    await user.type(screen.getByLabelText(/^Age$/i), '25');

    await user.type(screen.getByLabelText(/email/i), 'john@test.com');

    await user.selectOptions(screen.getByLabelText(/gender/i), 'male');

    await user.type(screen.getByLabelText(/country/i), 'United States');

    await user.type(screen.getByLabelText(/^Password$/i), 'Password1!');

    await user.type(screen.getByLabelText(/^Confirm Password$/i), 'Password1!');

    await user.click(screen.getByLabelText(/accept terms and conditions/i));

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    const input = screen.getByLabelText(/profile image/i);

    await user.upload(input, file);

    const button = screen.getByRole('button', {
      name: /submit/i,
    });

    await user.click(button);
  });
});
