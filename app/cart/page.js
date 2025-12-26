'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('luxe-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        const newCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );

        setCart(newCart);
        localStorage.setItem('luxe-cart', JSON.stringify(newCart));
    };

    const removeItem = (productId) => {
        const newCart = cart.filter(item => item.id !== productId);
        setCart(newCart);
        localStorage.setItem('luxe-cart', JSON.stringify(newCart));
    };

    const subtotal = cart.reduce((sum, item) => {
        const price = item.salePrice || item.price;
        return sum + (price * item.quantity);
    }, 0);

    // Free shipping over Rs. 5,000
    const shipping = subtotal > 5000 ? 0 : 350;
    const total = subtotal + shipping;

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Format price in PKR
    const formatPrice = (price) => {
        return `Rs. ${price.toLocaleString('en-PK')}`;
    };

    return (
        <>
            <Header cartCount={cartCount} />
            <main className="cart-page">
                <div className="container">
                    <h1 style={{ marginBottom: 'var(--spacing-2xl)' }}>Shopping Cart</h1>

                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <h2>Your cart is empty</h2>
                            <p>Discover our collection and add something beautiful to your cart.</p>
                            <Link href="/" className="btn btn-primary">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-grid">
                            {/* Cart Items */}
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>

                                        <div className="cart-item-info">
                                            <h3 className="cart-item-name">{item.name}</h3>
                                            <p className="cart-item-meta">
                                                {item.size && `Size: ${item.size}`}
                                            </p>

                                            <div className="quantity-selector" style={{ marginBottom: 0 }}>
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button
                                                    className="quantity-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="cart-item-actions">
                                            <span className="cart-item-price">
                                                {formatPrice((item.salePrice || item.price) * item.quantity)}
                                            </span>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="cart-summary">
                                <h3>Order Summary</h3>

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>

                                <div className="summary-row">
                                    <span>Delivery</span>
                                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                                </div>

                                {shipping > 0 && (
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-sm)' }}>
                                        Add {formatPrice(5000 - subtotal)} more for free delivery
                                    </p>
                                )}

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span style={{ color: 'var(--color-primary)' }}>{formatPrice(total)}</span>
                                </div>

                                <button className="btn btn-primary checkout-btn">
                                    Proceed to Checkout
                                </button>

                                <Link
                                    href="/"
                                    className="btn btn-outline"
                                    style={{ width: '100%', marginTop: 'var(--spacing-md)' }}
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
