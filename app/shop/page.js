'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { useState, useEffect } from 'react';

export default function ShopPage() {
    const [cart, setCart] = useState([]);

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

    return (
        <>
            <Header cartCount={cartCount} />
            <main style={{ paddingTop: 'calc(80px + var(--spacing-3xl))', minHeight: '100vh' }}>
                <div className="container">
                    {/* Page Header */}
                    <div className="section-header" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <h1 className="section-title">Shop All</h1>
                        <p className="section-subtitle">
                            Discover our complete collection of {products.length} premium products.
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="products-grid" style={{ marginBottom: 'var(--spacing-4xl)' }}>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
