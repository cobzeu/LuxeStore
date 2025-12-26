'use client';

import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <section className="section newsletter">
            <div className="container">
                <div className="newsletter-content">
                    <h2 className="newsletter-title">Join Our Exclusive List</h2>
                    <p className="newsletter-text">
                        Subscribe to receive early access to new collections,
                        exclusive offers, and style inspiration direct to your inbox.
                    </p>

                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="newsletter-input"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Subscribe
                        </button>
                    </form>

                    {status === 'success' && (
                        <p style={{ color: 'var(--color-success)', marginTop: 'var(--spacing-md)' }}>
                            Thank you for subscribing!
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
