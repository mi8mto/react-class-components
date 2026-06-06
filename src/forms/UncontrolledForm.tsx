import { useRef, useState } from 'react';
import { formSchema } from '../schemas/formSchema';
import { useFormStore } from '../store/formStore';
import { fileToBase64 } from '../utils/fileToBase64';

export const UncontrolledForm = () => {
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

  const addSubmission = useFormStore((state) => state.addSubmission);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    setErrors({});

    console.log(result.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Full Name</label>
      <input id="fullName" ref={fullNameRef} autoComplete="name" />
      {errors.fullName && <p>{errors.fullName[0]}</p>}

      <label htmlFor="age">Age</label>
      <input id="age" ref={ageRef} type="number" />
      {errors.age && <p>{errors.age[0]}</p>}

      <label htmlFor="email">Email</label>
      <input id="email" ref={emailRef} autoComplete="email" />
      {errors.email && <p>{errors.email[0]}</p>}

      <label htmlFor="gender">Gender</label>
      <select id="gender" ref={genderRef}>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>{errors.gender[0]}</p>}

      <label htmlFor="country">Country</label>
      <input id="country" ref={countryRef} list="countries" />

      <datalist id="countries">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>

      {errors.country && <p>{errors.country[0]}</p>}

      <label htmlFor="image">Profile Image</label>
      <input
        id="image"
        ref={imageRef}
        type="file"
        accept="image/png,image/jpeg"
      />
      {errors.image && <p>{errors.image[0]}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        ref={passwordRef}
        type="password"
        autoComplete="new-password"
      />
      {errors.password && <p>{errors.password[0]}</p>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        ref={confirmPasswordRef}
        type="password"
        autoComplete="new-password"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword[0]}</p>}

      <div>
        <input id="terms" ref={termsRef} type="checkbox" />
        <label htmlFor="terms">Accept Terms and Conditions</label>
      </div>

      {errors.terms && <p>{errors.terms[0]}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};
