'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({ orders: 0, revenue: 0, pending: 0, products: 0 });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders'); // orders, products

    useEffect(() => {
        // Check authentication
        if (localStorage.getItem('luxe_admin_token') !== 'authenticated') {
            router.push('/luxeadmin');
            return;
        }

        loadData();
    }, [router]);

    const loadData = async () => {
        try {
            const response = await fetch('/api/admin/data');
            const data = await response.json();

            if (data.success) {
                setStats(data.stats);
                setOrders(data.orders || []);
            }
        } catch (error) {
            console.error('Failed to load data:', error);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('luxe_admin_token');
        router.push('/luxeadmin');
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch('/api/admin/update-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus })
            });

            if (response.ok) {
                await loadData(); // Reload data
            }
        } catch (error) {
            console.error('Failed to update order:', error);
        }
    };

    const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') || 0}`;
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-PK');

    if (loading) {
        return <div className="admin-loading">Loading...</div>;
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-content">
                    <h1>LuxePakistan Admin</h1>
                    <button onClick={handleLogout} className="btn btn-outline btn-sm">
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="admin-stats">
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.orders}</div>
                        <div className="stat-label">Total Orders</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <div className="stat-value">{formatPrice(stats.revenue)}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.pending}</div>
                        <div className="stat-label">Pending Orders</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🛍️</div>
                    <div className="stat-info">
                        <div className="stat-value">{stats.products}</div>
                        <div className="stat-label">Products</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders Management
                </button>
                <button
                    className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    Products Management
                </button>
            </div>

            {/* Content */}
            <div className="admin-content">
                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <h2>All Orders</h2>
                        <div className="orders-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td><strong>{order.order_number}</strong></td>
                                            <td>
                                                {order.customer_name}<br />
                                                <small>{order.phone}</small>
                                            </td>
                                            <td>{formatDate(order.created_at)}</td>
                                            <td><strong>{formatPrice(order.total)}</strong></td>
                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className={`status-badge status-${order.status}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        alert(`Order Details:\n\nItems: ${JSON.stringify(order.items, null, 2)}\n\nAddress: ${order.address}, ${order.city}`);
                                                    }}
                                                    className="btn btn-outline btn-sm"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <div className="no-data">No orders found</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="products-section">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2>Products</h2>
                            <Link href="/luxeadmin/add-product" className="btn btn-primary">
                                Add New Product
                            </Link>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            Product management coming soon. For now, products are managed in the lib/products.js file.
                            <br />To add products to database, you'll need to insert them via Supabase dashboard.
                        </p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .admin-dashboard {
                    min-height: 100vh;
                    background: var(--color-background);
                    padding-bottom: 40px;
                }

                .admin-header {
                    background: var(--color-surface);
                    border-bottom: 1px solid var(--color-border);
                    padding: 20px 0;
                }

                .admin-header-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .admin-header h1 {
                    color: var(--color-primary);
                    margin: 0;
                }

                .admin-stats {
                    max-width: 1400px;
                    margin: 30px auto;
                    padding: 0 20px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }

                .stat-card {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 20px;
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .stat-icon {
                    font-size: 40px;
                }

                .stat-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--color-primary);
                }

                .stat-label {
                    color: var(--color-text-muted);
                    font-size: 14px;
                }

                .admin-tabs {
                    max-width: 1400px;
                    margin: 0 auto 30px;
                    padding: 0 20px;
                    display: flex;
                    gap: 10px;
                    border-bottom: 1px solid var(--color-border);
                }

                .admin-tab {
                    background: none;
                    border: none;
                    padding: 15px 20px;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all var(--transition-fast);
                }

                .admin-tab.active {
                    color: var(--color-primary);
                    border-bottom-color: var(--color-primary);
                }

                .admin-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .orders-table {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th {
                    background: var(--color-surface-elevated);
                    padding: 15px;
                    text-align: left;
                    color: var(--color-text);
                    font-weight: 600;
                    border-bottom: 1px solid var(--color-border);
                }

                td {
                    padding: 15px;
                    border-bottom: 1px solid var(--color-border);
                    color: var(--color-text-muted);
                }

                tbody tr:hover {
                    background: var(--color-surface-elevated);
                }

                .status-badge {
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: 500;
                    border: 1px solid;
                    background: transparent;
                    cursor: pointer;
                }

                .status-pending {
                    color: #f59e0b;
                    border-color: #f59e0b;
                }

                .status-confirmed {
                    color: #3b82f6;
                    border-color: #3b82f6;
                }

                .status-shipped {
                    color: #8b5cf6;
                    border-color: #8b5cf6;
                }

                .status-delivered {
                    color: var(--color-success);
                    border-color: var(--color-success);
                }

                .status-cancelled {
                    color: #ef4444;
                    border-color: #ef4444;
                }

                .no-data {
                    padding: 40px;
                    text-align: center;
                    color: var(--color-text-muted);
                }

                .admin-loading {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-muted);
                }

                @media (max-width: 768px) {
                    table {
                        font-size: 14px;
                    }

                    th, td {
                        padding: 10px;
                    }

                    .admin-stats {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
