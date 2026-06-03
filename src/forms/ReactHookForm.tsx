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
      email: data.email,
      createdAt: new Date().toISOString(),
    });
    reset();
    setIsModalOpen(true);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('fullName')}
          placeholder="Full name"
          autoComplete="name"
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}

        <input
          {...register('email')}
          placeholder="Email"
          autoComplete="email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Submit</button>

        <hr />

        <h2>Submissions</h2>

        {submissions.map((submission) => (
          <div key={submission.id}>
            <h3>{submission.fullName}</h3>

            <p>{submission.email}</p>

            <small>{submission.createdAt}</small>
          </div>
        ))}
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Form submitted successfully!</h2>
      </Modal>
    </>
  );
};
