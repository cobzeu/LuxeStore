'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header({ cartCount = 0 }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { user, loading, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.user-menu')) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setUserMenuOpen(false);
    };

    const getUserInitials = () => {
        if (!user) return '';
        const name = user.user_metadata?.full_name || user.email;
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link href="/" className="logo">
                    LUXE
                </Link>

                <nav className="nav-menu">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/shop" className="nav-link">Shop</Link>
                    <Link href="/collections" className="nav-link">Collections</Link>
                    <Link href="/collections/watches" className="nav-link">Watches</Link>
                    <Link href="/collections/shoes" className="nav-link">Shoes</Link>
                </nav>

                <div className="header-actions">
                    <button className="header-icon" aria-label="Search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </button>

                    {/* User Account */}
                    {!loading && (
                        <>
                            {user ? (
                                <div className="user-menu">
                                    <button
                                        className="user-menu-trigger"
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    >
                                        <span className="user-avatar">{getUserInitials()}</span>
                                    </button>

                                    {userMenuOpen && (
                                        <div className="user-dropdown">
                                            <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                                {user.email}
                                            </div>
                                            <div className="user-dropdown-divider"></div>
                                            <Link href="/account" className="user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                                My Account
                                            </Link>
                                            <Link href="/orders" className="user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                                                Orders
                                            </Link>
                                            <div className="user-dropdown-divider"></div>
                                            <button className="user-dropdown-item" onClick={handleSignOut}>
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="header-icon" aria-label="Account">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </Link>
                            )}
                        </>
                    )}

                    <Link href="/cart" className="header-icon" aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--color-surface)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: 'var(--spacing-lg)',
                }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                        <Link href="/collections" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
                        <Link href="/collections/watches" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Watches</Link>
                        <Link href="/collections/shoes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Shoes</Link>
                        <Link href="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
                        {user ? (
                            <>
                                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)', marginTop: 'var(--spacing-sm)' }}>
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{user.email}</span>
                                </div>
                                <button className="nav-link" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} style={{ textAlign: 'left' }}>
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                                <Link href="/signup" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Create Account</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
