import { describe, expect, it } from 'vitest';
import { formSchema } from './formSchema';

const validFile = new File(['test'], 'avatar.png', {
  type: 'image/png',
});

const validData = {
  fullName: 'John Smith',
  age: 25,
  email: 'john@test.com',
  gender: 'male',
  country: 'United States',
  image: [validFile],
  terms: true,
  password: 'Password1!',
  confirmPassword: 'Password1!',
};

describe('formSchema', () => {
  it('accepts valid data', () => {
    expect(formSchema.safeParse(validData).success).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(
      formSchema.safeParse({
        ...validData,
        email: 'wrong-email',
      }).success,
    ).toBe(false);
  });

  it('rejects different passwords', () => {
    expect(
      formSchema.safeParse({
        ...validData,
        confirmPassword: 'another',
      }).success,
    ).toBe(false);
  });

  it('rejects invalid country', () => {
    expect(
      formSchema.safeParse({
        ...validData,
        country: 'Mars',
      }).success,
    ).toBe(false);
  });

  it('rejects image larger than 2mb', () => {
    const largeFile = new File(
      [new Uint8Array(2 * 1024 * 1024 + 1)],
      'large.png',
      { type: 'image/png' },
    );

    expect(
      formSchema.safeParse({
        ...validData,
        image: [largeFile],
      }).success,
    ).toBe(false);
  });
});
