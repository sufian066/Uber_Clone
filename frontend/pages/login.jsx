import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from '../components/AuthForm.module.css';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token && data.user) {
        login({ token: data.token, user: data.user });
        router.push('/'); // redirect to home page
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to continue booking your rides.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <div className={styles.label}>Email</div>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className={styles.label}>Password</div>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>

        <div className={styles.footerText}>
          New here?{' '}
          <Link href="/register" className={styles.link}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
