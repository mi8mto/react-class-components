import { z } from 'zod';

export const formSchema = z.object({
  fullName: z.string().min(3, 'Full name must contain at least 3 characters'),

  email: z.email('Please enter a valid email address'),

  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

export type FormSchema = z.infer<typeof formSchema>;
