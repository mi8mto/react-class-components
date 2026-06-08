import { beforeEach, describe, expect, it } from 'vitest';
import { useFormStore } from './formStore';

describe('formStore', () => {
  beforeEach(() => {
    useFormStore.setState({
      submissions: [],
      countries: useFormStore.getState().countries,
    });
  });

  it('adds submission to store', () => {
    useFormStore.getState().addSubmission({
      id: '1',
      fullName: 'Igor',
      age: 30,
      email: 'igor@test.com',
      gender: 'male',
      country: 'United States',
      image: 'base64-image',
      createdAt: '2026-06-08T00:00:00.000Z',
    });
    expect(useFormStore.getState().submissions).toHaveLength(1);
  });

  it('stores correct submission data', () => {
    useFormStore.getState().addSubmission({
      id: '1',
      fullName: 'Igor',
      age: 30,
      email: 'igor@test.com',
      gender: 'male',
      country: 'United States',
      image: 'base64-image',
      createdAt: '2026-06-08T00:00:00.000Z',
    });
    expect(useFormStore.getState().submissions[0].fullName).toBe('Igor');
    expect(useFormStore.getState().submissions[0].email).toBe('igor@test.com');
  });

  it('contains countries list', () => {
    expect(useFormStore.getState().countries.length).toBeGreaterThan(0);
  });
});
