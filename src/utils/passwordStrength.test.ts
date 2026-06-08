import { describe, expect, it } from 'vitest';
import { getPasswordStrength } from './passwordStrength';

describe('getPasswordStrength', () => {
  it('returns true for all requirements', () => {
    const result = getPasswordStrength('Password1!');
    expect(result.hasNumber).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasSpecial).toBe(true);
  });

  it('returns false for missing requirements', () => {
    const result = getPasswordStrength('password');
    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasSpecial).toBe(false);
  });

  it('returns false for empty password', () => {
    const result = getPasswordStrength('');
    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(false);
  });
});
