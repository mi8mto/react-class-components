import { useRef, useState } from 'react';
import { formSchema } from '../schemas/formSchema';
import { useFormStore } from '../store/formStore';
import { fileToBase64 } from '../utils/fileToBase64';
import { getPasswordStrength } from '../utils/passwordStrength';

interface UncontrolledFormProps {
  onSuccess?: () => void;
}

export const UncontrolledForm = ({ onSuccess }: UncontrolledFormProps) => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countries = useFormStore((state) => state.countries);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [password, setPassword] = useState('');
  const strength = getPasswordStrength(password);
  const addSubmission = useFormStore((state) => state.addSubmission);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
      fullName: fullNameRef.current?.value ?? '',
      age: Number(ageRef.current?.value ?? 0),
      email: emailRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      country: countryRef.current?.value ?? '',
      image: imageRef.current?.files,
      terms: termsRef.current?.checked ?? false,
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    const file = result.data.image?.[0];
    if (!file) {
      return;
    }

    const imageBase64 = await fileToBase64(file);

    addSubmission({
      id: crypto.randomUUID(),
      fullName: result.data.fullName,
      age: result.data.age,
      email: result.data.email,
      gender: result.data.gender,
      country: result.data.country,
      image: imageBase64,
      createdAt: new Date().toISOString(),
    });

    form.reset();
    setErrors({});
    setPassword('');
    onSuccess?.();
  };

  return (
    <div className="glass-card">
      <h2 className="card-title">Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullNameUnc">Full Name</label>
          <input
            id="fullNameUnc"
            className={`input ${errors.fullName ? 'error' : ''}`}
            ref={fullNameRef}
            autoComplete="name"
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName[0]}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="ageUnc">Age</label>
          <input
            id="ageUnc"
            className={`input ${errors.age ? 'error' : ''}`}
            ref={ageRef}
            type="number"
          />
          {errors.age && <span className="error-message">{errors.age[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="emailUnc">Email</label>
          <input
            id="emailUnc"
            className={`input ${errors.email ? 'error' : ''}`}
            ref={emailRef}
            autoComplete="email"
          />
          {errors.email && (
            <span className="error-message">{errors.email[0]}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="genderUnc">Gender</label>
          <select
            id="genderUnc"
            className={`select ${errors.gender ? 'error' : ''}`}
            ref={genderRef}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender[0]}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="countryUnc">Country</label>
          <input
            id="countryUnc"
            className={`input ${errors.country ? 'error' : ''}`}
            ref={countryRef}
            list="countriesUnc"
          />
          <datalist id="countriesUnc">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <span className="error-message">{errors.country[0]}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="imageUnc">Profile Image</label>
          <div className="file-upload-container">
            <input
              id="imageUnc"
              className="file-input"
              ref={imageRef}
              type="file"
              accept="image/png,image/jpeg"
            />
          </div>
          {errors.image && (
            <span className="error-message">{errors.image[0]}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="passwordUnc">Password</label>
          <input
            id="passwordUnc"
            className={`input ${errors.password ? 'error' : ''}`}
            ref={passwordRef}
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-message">{errors.password[0]}</span>
          )}
          <ul className="password-strength-list">
            <li>{strength.hasNumber ? '✅' : '❌'} Number</li>
            <li>{strength.hasUppercase ? '✅' : '❌'} Uppercase</li>
            <li>{strength.hasLowercase ? '✅' : '❌'} Lowercase</li>
            <li>{strength.hasSpecial ? '✅' : '❌'} Special character</li>
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPasswordUnc">Confirm Password</label>
          <input
            id="confirmPasswordUnc"
            className={`input ${errors.confirmPassword ? 'error' : ''}`}
            ref={confirmPasswordRef}
            type="password"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword[0]}</span>
          )}
        </div>

        <div className="form-group">
          <div className="checkbox-container">
            <input id="termsUnc" ref={termsRef} type="checkbox" />
            <label htmlFor="termsUnc">Accept Terms and Conditions</label>
          </div>
          {errors.terms && (
            <span className="error-message">{errors.terms[0]}</span>
          )}
        </div>

        <button className="btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
