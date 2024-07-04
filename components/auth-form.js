'use client';
import Link from 'next/link';
import Image from 'next/image'
import { useFormState } from 'react-dom';

import { auth } from '@/actions/auth-actions';

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image
        src="/images/auth-icon.jpg"
        width={500}
        height={500}
        alt="A lock icon"
        />
      </div>
      <p>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
      <p>
        {mode === 'login' && (
          <Link href="/auth/sign-in?mode=signup">Create an account.</Link>
        )}
        {mode === 'signup' && (
          <Link href="/auth/sign-in?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
