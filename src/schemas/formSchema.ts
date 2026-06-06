import { z } from 'zod';
import { countries } from '../constants/countries';
const countryList: readonly string[] = countries;

export const formSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'Full name must contain at least 3 characters')
      .refine(
        (value) => value.length > 0 && value[0] === value[0].toUpperCase(),
        'First letter must be uppercase',
      ),

    age: z.number().min(0, 'Age cannot be negative'),

    email: z.email('Please enter a valid email address'),

    gender: z.enum(['male', 'female', 'other']),

    country: z
      .string()
      .min(1, 'Country is required')
      .refine(
        (value) => countryList.includes(value),
        'Please select a valid country',
      ),

    image: z
      .any()
      .refine((files) => files?.length === 1, 'Image is required')
      .refine(
        (files) =>
          !files?.[0] || ['image/png', 'image/jpeg'].includes(files[0].type),
        'Only PNG and JPEG images are allowed',
      )
      .refine(
        (files) => !files?.[0] || files[0].size <= 2 * 1024 * 1024,
        'Image size must be less than 2MB',
      ),

    terms: z.boolean().refine((value) => value === true, {
      message: 'You must accept Terms and Conditions',
    }),

    password: z.string().min(8, 'Password must contain at least 8 characters'),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;
