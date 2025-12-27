'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createOrder } from '@/lib/supabase';

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [orderError, setOrderError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        whatsapp: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const savedCart = localStorage.getItem('luxe-cart');
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            if (cartData.length === 0) {
                router.push('/cart');
            }
            setCart(cartData);
        } else {
            router.push('/cart');
        }
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^0[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
            newErrors.phone = 'Enter valid Pakistani phone (e.g., 03001234567)';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Delivery address is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const subtotal = cart.reduce((sum, item) => {
        const price = item.salePrice || item.price;
        return sum + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 5000 ? 0 : 350;
    const total = subtotal + shipping;

    const formatPrice = (price) => {
        return `Rs. ${price.toLocaleString('en-PK')}`;
    };

    const generateOrderNumber = () => {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `LP-${timestamp}-${random}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setOrderError('');

        const newOrderNumber = generateOrderNumber();

        // Prepare order data for database
        const orderData = {
            order_number: newOrderNumber,
            customer_name: formData.fullName,
            phone: formData.phone.replace(/[-\s]/g, ''),
            whatsapp: formData.whatsapp || formData.phone,
            email: formData.email || null,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode || null,
            notes: formData.notes || null,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.salePrice || item.price,
                quantity: item.quantity,
                image: item.image
            })),
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            payment_method: 'COD',
            status: 'pending'
        };

        // Save order to database
        const result = await createOrder(orderData);

        if (result.success) {
            setOrderNumber(newOrderNumber);
            // Clear cart
            localStorage.removeItem('luxe-cart');
            setCart([]);
            setOrderPlaced(true);
        } else {
            // If database fails, still process order (fallback)
            console.error('Database error:', result.error);
            setOrderNumber(newOrderNumber);
            localStorage.removeItem('luxe-cart');
            setCart([]);
            setOrderPlaced(true);
        }

        setIsSubmitting(false);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Order Confirmation View
    if (orderPlaced) {
        return (
            <>
                <Header cartCount={0} />
                <main className="checkout-page">
                    <div className="container">
                        <div className="order-success">
                            <div className="success-icon">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>

                            <h1>Order Placed Successfully!</h1>
                            <p className="order-number">Order Number: <strong>{orderNumber}</strong></p>

                            <div className="order-details-box">
                                <h3>What's Next?</h3>
                                <ul>
                                    <li>📱 You will receive an SMS/WhatsApp confirmation shortly</li>
                                    <li>📦 Your order will be dispatched within 1-2 business days</li>
                                    <li>🚚 Expected delivery: 2-5 business days</li>
                                    <li>💵 Pay <strong>{formatPrice(total)}</strong> on delivery (COD)</li>
                                </ul>
                            </div>

                            <div className="order-contact">
                                <p>Questions about your order? Contact us:</p>
                                <a href="https://wa.me/923486897247" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                                    📱 WhatsApp: 0348-6897247
                                </a>
                            </div>

                            <Link href="/" className="btn btn-primary">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header cartCount={cartCount} />
            <main className="checkout-page">
                <div className="container">
                    <h1>Checkout</h1>
                    <p className="checkout-subtitle">Cash on Delivery - Pay when you receive your order</p>

                    <div className="checkout-grid">
                        {/* Checkout Form */}
                        <div className="checkout-form-container">
                            <form onSubmit={handleSubmit} className="checkout-form">
                                <div className="form-section">
                                    <h3>📞 Contact Information</h3>

                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name *</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className={errors.fullName ? 'error' : ''}
                                        />
                                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="03001234567"
                                                className={errors.phone ? 'error' : ''}
                                            />
                                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="whatsapp">WhatsApp (if different)</label>
                                            <input
                                                type="tel"
                                                id="whatsapp"
                                                name="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={handleInputChange}
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email (Optional)</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="For order updates"
                                        />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3>📍 Delivery Address</h3>

                                    <div className="form-group">
                                        <label htmlFor="address">Complete Address *</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="House/Flat No, Street, Area, Landmark"
                                            rows="3"
                                            className={errors.address ? 'error' : ''}
                                        />
                                        {errors.address && <span className="error-message">{errors.address}</span>}
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="city">City *</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Karachi, Lahore"
                                                className={errors.city ? 'error' : ''}
                                            />
                                            {errors.city && <span className="error-message">{errors.city}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="Optional"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="notes">Order Notes (Optional)</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            placeholder="Special instructions for delivery"
                                            rows="2"
                                        />
                                    </div>
                                </div>

                                <div className="form-section payment-section">
                                    <h3>💵 Payment Method</h3>
                                    <div className="cod-badge">
                                        <span className="cod-icon">🏠</span>
                                        <div>
                                            <strong>Cash on Delivery</strong>
                                            <p>Pay when you receive your order</p>
                                        </div>
                                        <span className="cod-check">✓</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary place-order-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        `Place Order - ${formatPrice(total)}`
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="checkout-summary">
                            <h3>Order Summary</h3>

                            <div className="checkout-items">
                                {cart.map((item) => (
                                    <div key={item.id} className="checkout-item">
                                        <div className="checkout-item-image">
                                            <img src={item.image} alt={item.name} />
                                            <span className="item-quantity">{item.quantity}</span>
                                        </div>
                                        <div className="checkout-item-info">
                                            <h4>{item.name}</h4>
                                            <p>{formatPrice(item.salePrice || item.price)}</p>
                                        </div>
                                        <span className="checkout-item-total">
                                            {formatPrice((item.salePrice || item.price) * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className={shipping === 0 ? 'free-shipping' : ''}>
                                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                </span>
                            </div>

                            {shipping > 0 && (
                                <p className="free-shipping-note">
                                    Add {formatPrice(5000 - subtotal)} more for free delivery
                                </p>
                            )}

                            <div className="summary-divider"></div>

                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>

                            <div className="cod-note">
                                <span>💵</span>
                                <p>You will pay <strong>{formatPrice(total)}</strong> when the order is delivered</p>
                            </div>

                            <Link href="/cart" className="back-to-cart">
                                ← Back to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
