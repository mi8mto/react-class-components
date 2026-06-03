import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormSchema } from '../schemas/formSchema';
import { formSchema } from '../schemas/formSchema';
import { useFormStore } from '../store/formStore';
import { Modal } from '../components/Modal/Modal';

export const ReactHookForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const addSubmission = useFormStore((state) => state.addSubmission);
  const submissions = useFormStore((state) => state.submissions);

  const onSubmit = (data: FormSchema) => {
    addSubmission({
      id: crypto.randomUUID(),
      fullName: data.fullName,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: '', // временно
      image: '', // временно
      createdAt: new Date().toISOString(),
    });
    reset();
    setIsModalOpen(true);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName">Full Name</label>

        <input id="fullName" {...register('fullName')} autoComplete="name" />
        {errors.fullName && <p>{errors.fullName.message}</p>}

        <label htmlFor="age">Age</label>

        <input
          id="age"
          type="number"
          {...register('age', {
            valueAsNumber: true,
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="email">Email</label>

        <input id="email" {...register('email')} autoComplete="email" />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="gender">Gender</label>

        <select id="gender" {...register('gender')}>
          <option value="">Select gender</option>

          <option value="male">Male</option>

          <option value="female">Female</option>

          <option value="other">Other</option>
        </select>

        {errors.gender && <p>{errors.gender.message}</p>}

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          {...register('password')}
          autoComplete="new-password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          autoComplete="new-password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <div>
          <input id="terms" type="checkbox" {...register('terms')} />

          <label htmlFor="terms">Accept Terms and Conditions</label>
        </div>

        {errors.terms && <p>{errors.terms.message}</p>}

        <button type="submit">Submit</button>

        <hr />

        <h2>Submissions</h2>

        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          submissions.map((submission) => (
            <div key={submission.id}>
              <h3>{submission.fullName}</h3>
              <p>{submission.email}</p>
              <small>{submission.createdAt}</small>
            </div>
          ))
        )}
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Form submitted successfully!</h2>
      </Modal>
    </>
  );
};
