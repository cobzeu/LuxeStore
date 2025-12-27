'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if already logged in
        if (localStorage.getItem('luxe_admin_token') === 'authenticated') {
            router.push('/luxeadmin/dashboard');
        }
    }, [router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (credentials.username === 'LuxeAdmin' && credentials.password === 'Luxe123') {
            localStorage.setItem('luxe_admin_token', 'authenticated');
            router.push('/luxeadmin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-container">
                <div className="admin-login-box">
                    <div className="admin-logo">
                        <h1>LuxePakistan</h1>
                        <p>Admin Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={credentials.username}
                                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {error && <div className="admin-error">{error}</div>}

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            Sign In
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .admin-login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
                    padding: 20px;
                }

                .admin-login-container {
                    width: 100%;
                    max-width: 400px;
                }

                .admin-login-box {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 40px;
                    box-shadow: var(--shadow-lg);
                }

                .admin-logo {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .admin-logo h1 {
                    color: var(--color-primary);
                    margin-bottom: 5px;
                    font-size: 28px;
                }

                .admin-logo p {
                    color: var(--color-text-muted);
                    font-size: 14px;
                }

                .admin-login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .admin-error {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid #ef4444;
                    color: #ef4444;
                    padding: 10px;
                    border-radius: var(--radius-md);
                    text-align: center;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
}
