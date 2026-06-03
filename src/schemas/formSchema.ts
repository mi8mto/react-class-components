import { z } from 'zod';

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
