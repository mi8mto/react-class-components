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
    <div className="glass-card">
      <h2 className="card-title">React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="fullNameHook">Full Name</label>
          <input
            id="fullNameHook"
            className={`input ${errors.fullName ? 'error' : ''}`}
            {...register('fullName')}
            autoComplete="name"
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ageHook">Age</label>
          <input
            id="ageHook"
            className={`input ${errors.age ? 'error' : ''}`}
            type="number"
            {...register('age', {
              valueAsNumber: true,
            })}
          />
          {errors.age && (
            <span className="error-message">{errors.age.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="emailHook">Email</label>
          <input
            id="emailHook"
            className={`input ${errors.email ? 'error' : ''}`}
            {...register('email')}
            autoComplete="email"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="genderHook">Gender</label>
          <select
            id="genderHook"
            className={`select ${errors.gender ? 'error' : ''}`}
            {...register('gender')}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="countryHook">Country</label>
          <input
            id="countryHook"
            className={`input ${errors.country ? 'error' : ''}`}
            list="countriesHook"
            {...register('country')}
          />
          <datalist id="countriesHook">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <span className="error-message">{errors.country.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="imageHook">Profile Image</label>
          <div className="file-upload-container">
            <input
              id="imageHook"
              className="file-input"
              type="file"
              accept="image/png,image/jpeg"
              {...register('image')}
            />
          </div>
          {errors.image && (
            <span className="error-message">
              {String(errors.image.message)}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="passwordHook">Password</label>
          <input
            id="passwordHook"
            className={`input ${errors.password ? 'error' : ''}`}
            type="password"
            {...register('password')}
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
          <ul className="password-strength-list">
            <li>{strength.hasNumber ? '✅' : '❌'} Number</li>
            <li>{strength.hasUppercase ? '✅' : '❌'} Uppercase</li>
            <li>{strength.hasLowercase ? '✅' : '❌'} Lowercase</li>
            <li>{strength.hasSpecial ? '✅' : '❌'} Special character</li>
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPasswordHook">Confirm Password</label>
          <input
            id="confirmPasswordHook"
            className={`input ${errors.confirmPassword ? 'error' : ''}`}
            type="password"
            {...register('confirmPassword')}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span className="error-message">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <div className="checkbox-container">
            <input id="termsHook" type="checkbox" {...register('terms')} />
            <label htmlFor="termsHook">Accept Terms and Conditions</label>
          </div>
          {errors.terms && (
            <span className="error-message">{errors.terms.message}</span>
          )}
        </div>

        <button className="btn-primary" type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Form submitted successfully!</h2>
      </Modal>
    </div>
  );
};
