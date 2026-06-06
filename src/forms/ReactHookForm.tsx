import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormSchema } from '../schemas/formSchema';
import { formSchema } from '../schemas/formSchema';
import { useFormStore } from '../store/formStore';
import { Modal } from '../components/Modal/Modal';
import { getPasswordStrength } from '../utils/passwordStrength';
import { fileToBase64 } from '../utils/fileToBase64';

export const ReactHookForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const password = watch('password') ?? '';
  const strength = getPasswordStrength(password);

  const addSubmission = useFormStore((state) => state.addSubmission);
  const submissions = useFormStore((state) => state.submissions);
  const countries = useFormStore((state) => state.countries);

  const onSubmit = async (data: FormSchema) => {
    const file = data.image?.[0];

    if (!file) {
      return;
    }

    const imageBase64 = await fileToBase64(file);
    addSubmission({
      id: crypto.randomUUID(),
      fullName: data.fullName,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: data.country,
      image: imageBase64,
      createdAt: new Date().toISOString(),
    });
    reset();
    setIsModalOpen(true);
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

        <label htmlFor="country">Country</label>

        <input id="country" list="countries" {...register('country')} />

        <label htmlFor="image">Profile Image</label>

        <input
          id="image"
          type="file"
          accept="image/png,image/jpeg"
          {...register('image')}
        />

        {errors.image && <p>{String(errors.image.message)}</p>}

        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        {errors.country && <p>{errors.country.message}</p>}

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          {...register('password')}
          autoComplete="new-password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <ul>
          <li>{strength.hasNumber ? '✅' : '❌'} Number</li>
          <li>{strength.hasUppercase ? '✅' : '❌'} Uppercase</li>
          <li>{strength.hasLowercase ? '✅' : '❌'} Lowercase</li>
          <li>{strength.hasSpecial ? '✅' : '❌'} Special character</li>
        </ul>

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

        <button type="submit" disabled={!isValid}>
          Submit
        </button>

        <hr />

        <h2>Submissions</h2>

        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          submissions.map((submission) => {
            const isNew =
              Date.now() - new Date(submission.createdAt).getTime() < 5000;

            return (
              <div
                key={submission.id}
                className={isNew ? 'submission-new' : ''}
              >
                {submission.image && (
                  <img
                    src={submission.image}
                    alt={submission.fullName}
                    width={120}
                  />
                )}

                <h3>{submission.fullName}</h3>

                <p>{submission.email}</p>

                <small>{submission.createdAt}</small>
              </div>
            );
          })
        )}
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Form submitted successfully!</h2>
      </Modal>
    </>
  );
};
