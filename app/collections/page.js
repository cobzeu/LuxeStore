'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { collections } from '@/lib/products';
import { useState, useEffect } from 'react';

export default function AllCollectionsPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('luxe-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <Header cartCount={cartCount} />
            <main style={{ paddingTop: 'calc(80px + var(--spacing-3xl))', minHeight: '100vh' }}>
                <div className="container">
                    {/* Page Header */}
                    <div className="section-header" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <h1 className="section-title">All Collections</h1>
                        <p className="section-subtitle">
                            Explore our carefully curated collections of premium fashion and accessories.
                        </p>
                    </div>

                    {/* Collections Grid */}
                    <div className="collections-grid" style={{ marginBottom: 'var(--spacing-4xl)' }}>
                        {collections.map((collection) => (
                            <Link href={`/collections/${collection.slug}`} key={collection.id} className="collection-card">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="collection-image"
                                />
                                <div className="collection-overlay">
                                    <h3 className="collection-name">{collection.name}</h3>
                                    <span className="collection-count">{collection.count} items</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
