import { useRef, useState } from 'react';
import { formSchema } from '../schemas/formSchema';

export const UncontrolledForm = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      fullName: fullNameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    };

    const result = formSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);

      return;
    }

    setErrors({});
    console.log(result.data);

    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={fullNameRef} placeholder="Full name" autoComplete="name" />
      {errors.fullName && <p>{errors.fullName[0]}</p>}

      <input ref={emailRef} placeholder="Email" autoComplete="email" />
      {errors.email && <p>{errors.email[0]}</p>}

      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        autoComplete="current-password"
      />
      {errors.password && <p>{errors.password[0]}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};
