'use client';

import Link from 'next/link';

export default function BenefitsBar() {
    const benefits = [
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2.81M21 16v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5" />
                    <circle cx="7" cy="18" r="2" />
                    <circle cx="17" cy="18" r="2" />
                    <path d="M15 18H9" />
                </svg>
            ),
            title: "Free Delivery",
            subtitle: "On orders over Rs. 3,000"
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 14l-4-4 4-4" />
                    <path d="M5 10h11a4 4 0 110 8h-1" />
                </svg>
            ),
            title: "Easy Returns",
            subtitle: "7 days return policy"
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <path d="M1 10h22" />
                </svg>
            ),
            title: "Cash on Delivery",
            subtitle: "Pay when you receive"
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            ),
            title: "Premium Quality",
            subtitle: "100% authentic products"
        }
    ];

    return (
        <section className="benefits-bar">
            <div className="container">
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-item">
                            <div className="benefit-icon">{benefit.icon}</div>
                            <div className="benefit-text">
                                <span className="benefit-title">{benefit.title}</span>
                                <span className="benefit-subtitle">{benefit.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
