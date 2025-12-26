'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { collections, getProductsByCategory, getCollectionBySlug } from '@/lib/products';
import { useState, useEffect } from 'react';

export default function CollectionPage() {
    const params = useParams();
    const [cart, setCart] = useState([]);

    const collection = getCollectionBySlug(params.slug);
    const categoryProducts = getProductsByCategory(params.slug);

    useEffect(() => {
        const savedCart = localStorage.getItem('luxe-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        let newCart;

        if (existingItem) {
            newCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(newCart);
        localStorage.setItem('luxe-cart', JSON.stringify(newCart));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (!collection) {
        return (
            <>
                <Header cartCount={cartCount} />
                <main style={{ paddingTop: 'calc(80px + var(--spacing-3xl))', minHeight: '100vh' }}>
                    <div className="container">
                        <h1>Collection Not Found</h1>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--spacing-md)' }}>
                            The collection you're looking for doesn't exist.
                        </p>
                        <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--spacing-xl)' }}>
                            Back to Home
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header cartCount={cartCount} />
            <main style={{ paddingTop: 'calc(80px + var(--spacing-3xl))', minHeight: '100vh' }}>
                <div className="container">
                    {/* Breadcrumb */}
                    <nav style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                        <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
                        {' / '}
                        <Link href="/collections" style={{ color: 'var(--color-text-muted)' }}>Collections</Link>
                        {' / '}
                        <span style={{ color: 'var(--color-primary)' }}>{collection.name}</span>
                    </nav>

                    {/* Collection Header */}
                    <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--spacing-2xl)' }}>
                        <h1 className="section-title" style={{ display: 'block' }}>{collection.name}</h1>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--spacing-md)' }}>
                            {collection.description} • {categoryProducts.length} products
                        </p>
                    </div>

                    {/* Products Grid */}
                    {categoryProducts.length > 0 ? (
                        <div className="products-grid" style={{ marginBottom: 'var(--spacing-4xl)' }}>
                            {categoryProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-4xl)' }}>
                            <p style={{ color: 'var(--color-text-muted)' }}>No products found in this collection.</p>
                        </div>
                    )}

                    {/* Other Collections */}
                    <section className="section" style={{ paddingTop: 0 }}>
                        <div className="section-header">
                            <h2 className="section-title">Explore Other Collections</h2>
                        </div>
                        <div className="collections-grid">
                            {collections.filter(c => c.slug !== params.slug).slice(0, 4).map((col) => (
                                <Link href={`/collections/${col.slug}`} key={col.id} className="collection-card">
                                    <img
                                        src={col.image}
                                        alt={col.name}
                                        className="collection-image"
                                    />
                                    <div className="collection-overlay">
                                        <h3 className="collection-name">{col.name}</h3>
                                        <span className="collection-count">{col.count} items</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
