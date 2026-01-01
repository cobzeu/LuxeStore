'use client';

import Link from 'next/link';

export default function BrandStory() {
    return (
        <section className="brand-story section-padding">
            <div className="container">
                <div className="brand-story-grid">
                    <div className="brand-story-content">
                        <span className="brand-story-label">Our Story</span>
                        <h2 className="brand-story-title">
                            Celebrating Pakistani Heritage Through Fashion
                        </h2>
                        <p className="brand-story-text">
                            At LuxePakistan, we believe in preserving and celebrating the rich textile
                            traditions of Pakistan. Each piece in our collection tells a story of
                            skilled artisans, premium materials, and timeless design.
                        </p>
                        <p className="brand-story-text">
                            From the finest wool shawls handcrafted in the valleys to elegantly
                            designed unstitched suits, we bring you fashion that honors tradition
                            while embracing modern sophistication.
                        </p>
                        <div className="brand-stats">
                            <div className="stat-item">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Happy Customers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">22+</span>
                                <span className="stat-label">Premium Products</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Authentic Quality</span>
                            </div>
                        </div>
                        <Link href="/shop" className="btn btn-primary">
                            Explore Our Collection
                        </Link>
                    </div>
                    <div className="brand-story-visual">
                        <div className="visual-card">
                            <div className="visual-icon">✦</div>
                            <h3>Premium Quality</h3>
                            <p>Sourced from the finest materials</p>
                        </div>
                        <div className="visual-card">
                            <div className="visual-icon">✦</div>
                            <h3>Artisan Crafted</h3>
                            <p>Made with traditional expertise</p>
                        </div>
                        <div className="visual-card">
                            <div className="visual-icon">✦</div>
                            <h3>Timeless Design</h3>
                            <p>Elegance that never fades</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
