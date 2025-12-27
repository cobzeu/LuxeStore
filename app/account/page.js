'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

export default function AccountPage() {
    const router = useRouter();
    const { user, loading, signOut } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="account-page">
                    <div className="container">
                        <div className="loading-state">Loading...</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!user) {
        return null;
    }

    const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer';

    return (
        <>
            <Header />
            <main className="account-page">
                <div className="container">
                    <div className="account-header">
                        <h1>My Account</h1>
                        <p>Welcome back, <strong>{userName}</strong>!</p>
                    </div>

                    <div className="account-grid">
                        {/* Account Info Card */}
                        <div className="account-card">
                            <div className="account-card-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <h3>Account Details</h3>
                            </div>
                            <div className="account-card-content">
                                <div className="account-info-row">
                                    <span className="label">Email</span>
                                    <span className="value">{user.email}</span>
                                </div>
                                {user.user_metadata?.full_name && (
                                    <div className="account-info-row">
                                        <span className="label">Name</span>
                                        <span className="value">{user.user_metadata.full_name}</span>
                                    </div>
                                )}
                                <div className="account-info-row">
                                    <span className="label">Member Since</span>
                                    <span className="value">
                                        {new Date(user.created_at).toLocaleDateString('en-PK', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Orders Card */}
                        <Link href="/orders" className="account-card account-card-link">
                            <div className="account-card-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                <h3>My Orders</h3>
                            </div>
                            <div className="account-card-content">
                                <p>View your order history and track shipments</p>
                            </div>
                            <span className="card-arrow">→</span>
                        </Link>

                        {/* Wishlist Card */}
                        <Link href="/shop" className="account-card account-card-link">
                            <div className="account-card-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <h3>Continue Shopping</h3>
                            </div>
                            <div className="account-card-content">
                                <p>Explore our latest collections</p>
                            </div>
                            <span className="card-arrow">→</span>
                        </Link>

                        {/* Contact Card */}
                        <a href="https://wa.me/923486897247" target="_blank" rel="noopener noreferrer" className="account-card account-card-link">
                            <div className="account-card-header">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <h3>Need Help?</h3>
                            </div>
                            <div className="account-card-content">
                                <p>Contact us on WhatsApp: 0348-6897247</p>
                            </div>
                            <span className="card-arrow">→</span>
                        </a>
                    </div>

                    <button onClick={handleSignOut} className="btn btn-outline sign-out-btn">
                        Sign Out
                    </button>
                </div>
            </main>
            <Footer />
        </>
    );
}
