'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);

        const { data, error: signInError } = await signIn(email, password);

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
            return;
        }

        // Redirect to home on success
        router.push('/');
    };

    return (
        <>
            <Header />
            <main className="auth-page">
                <div className="container">
                    <div className="auth-container">
                        <div className="auth-card">
                            <div className="auth-header">
                                <h1>Welcome Back</h1>
                                <p>Sign in to your LUXE account</p>
                            </div>

                            <form onSubmit={handleSubmit} className="auth-form">
                                {error && (
                                    <div className="auth-error">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="15" y1="9" x2="9" y2="15" />
                                            <line x1="9" y1="9" x2="15" y2="15" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <div className="form-row" style={{ justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
                                    <Link href="/forgot-password" className="auth-link">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary auth-submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>

                                <p className="auth-footer-text">
                                    Don't have an account? <Link href="/signup">Create one</Link>
                                </p>
                            </form>
                        </div>

                        <div className="auth-features">
                            <h3>Welcome to LUXE</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                                Your destination for premium fashion and accessories.
                            </p>
                            <ul>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Track your orders</span>
                                </li>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Save your favorites</span>
                                </li>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Faster checkout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
