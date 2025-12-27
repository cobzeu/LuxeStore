'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function OrdersPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            loadOrders();
        }
    }, [user]);

    const loadOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('email', user.email)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setOrders(data);
            }
        } catch (err) {
            console.error('Error loading orders:', err);
        }
        setLoading(false);
    };

    const formatPrice = (price) => {
        return `Rs. ${price?.toLocaleString('en-PK') || 0}`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-PK', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const statusClasses = {
            pending: 'status-pending',
            confirmed: 'status-confirmed',
            shipped: 'status-shipped',
            delivered: 'status-delivered',
            cancelled: 'status-cancelled'
        };
        return statusClasses[status] || 'status-pending';
    };

    if (authLoading || !user) {
        return (
            <>
                <Header />
                <main className="orders-page">
                    <div className="container">
                        <div className="loading-state">Loading...</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="orders-page">
                <div className="container">
                    <div className="orders-header">
                        <Link href="/account" className="back-link">← Back to Account</Link>
                        <h1>My Orders</h1>
                    </div>

                    {loading ? (
                        <div className="loading-state">Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="no-orders">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <h2>No Orders Yet</h2>
                            <p>You haven't placed any orders yet.</p>
                            <Link href="/shop" className="btn btn-primary">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div key={order.id} className="order-card">
                                    <div className="order-card-header">
                                        <div className="order-info">
                                            <span className="order-number">Order #{order.order_number}</span>
                                            <span className="order-date">{formatDate(order.created_at)}</span>
                                        </div>
                                        <span className={`order-status ${getStatusBadge(order.status)}`}>
                                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                        </span>
                                    </div>

                                    <div className="order-items">
                                        {order.items?.map((item, index) => (
                                            <div key={index} className="order-item">
                                                <div className="order-item-image">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className="order-item-details">
                                                    <h4>{item.name}</h4>
                                                    <p>Qty: {item.quantity} × {formatPrice(item.price)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-card-footer">
                                        <div className="order-address">
                                            <strong>Delivery:</strong> {order.address}, {order.city}
                                        </div>
                                        <div className="order-total">
                                            <span>Total:</span>
                                            <strong>{formatPrice(order.total)}</strong>
                                        </div>
                                    </div>

                                    <div className="order-actions">
                                        <span className="payment-method">💵 Cash on Delivery</span>
                                        <a
                                            href={`https://wa.me/923486897247?text=Hi, I have a question about my order ${order.order_number}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline btn-sm"
                                        >
                                            📱 Track Order
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
