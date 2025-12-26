'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignUpPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!fullName || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        const { data, error: signUpError } = await signUp(email, password, fullName);

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
            return;
        }

        // Since email verification is disabled, redirect to home
        // The user will be automatically logged in
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
                                <h1>Create Account</h1>
                                <p>Join LUXE for exclusive access to premium fashion</p>
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
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

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

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary auth-submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                <p className="auth-footer-text">
                                    Already have an account? <Link href="/login">Sign in</Link>
                                </p>
                            </form>
                        </div>

                        <div className="auth-features">
                            <h3>Why join LUXE?</h3>
                            <ul>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Exclusive member-only discounts</span>
                                </li>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Early access to new collections</span>
                                </li>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Track orders and save favorites</span>
                                </li>
                                <li>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Personalized recommendations</span>
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
