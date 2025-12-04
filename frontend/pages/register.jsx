import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../components/AuthForm.module.css';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('rider');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (data.success) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create account</h1>
        <p className={styles.subtitle}>Join as a rider or driver in seconds.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <div className={styles.label}>Full name</div>
            <input
              className={styles.input}
              type="text"
              placeholder="Your name"
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <div className={styles.label}>Role</div>
            <select
              className={styles.input}
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>

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
            Sign up
          </button>
        </form>

        <div className={styles.footerText}>
          Already have an account?{' '}
          <Link href="/login" className={styles.link}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
