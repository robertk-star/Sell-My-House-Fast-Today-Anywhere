'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || 'Unable to log in.');
      setLoading(false);
      return;
    }

    router.push('/admin/leads');
  }

  return (
    <main className="admin-wrap">
      <div className="container" style={{ maxWidth: 520 }}>
        <form className="admin-card" onSubmit={login}>
          <h1 style={{ color: 'var(--navy)', fontSize: 38 }}>Admin Login</h1>
          <p className="muted">Enter the admin password to view seller leads.</p>
          {error && <p className="error">{error}</p>}
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 16, width: '100%' }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </main>
  );
}
