'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductById, products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const foundProduct = getProductById(params.id);
        setProduct(foundProduct);
        if (foundProduct?.sizes?.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
        }

        // Load cart from localStorage
        const savedCart = localStorage.getItem('luxe-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [params.id]);

    const addToCart = () => {
        if (!product) return;

        const existingItem = cart.find(item => item.id === product.id);
        let newCart;

        if (existingItem) {
            newCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity, size: selectedSize }
                    : item
            );
        } else {
            newCart = [...cart, { ...product, quantity, size: selectedSize }];
        }

        setCart(newCart);
        localStorage.setItem('luxe-cart', JSON.stringify(newCart));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (!product) {
        return (
            <>
                <Header cartCount={cartCount} />
                <main className="product-detail">
                    <div className="container">
                        <p>Loading...</p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const discount = product.salePrice
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;

    const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

    const getCategoryLabel = (category) => {
        const labels = {
            'shoes': 'Footwear',
            'watches': 'Timepieces',
            'scarf': 'Accessories',
            'shawl': 'Accessories',
            'suit-stitched': 'Ready to Wear',
            'suit-unstitched': 'Unstitched Fabric',
        };
        return labels[category] || category;
    };

    return (
        <>
            <Header cartCount={cartCount} />
            <main className="product-detail">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav style={{ marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-muted)' }}>
                        <Link href="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
                        {' / '}
                        <span style={{ color: 'var(--color-primary)' }}>{product.name}</span>
                    </nav>

                    <div className="product-detail-grid">
                        {/* Product Gallery */}
                        <div className="product-gallery">
                            <div className="product-main-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-detail-info">
                            <span className="product-detail-category">
                                {getCategoryLabel(product.category)}
                            </span>

                            <h1 className="product-detail-title">{product.name}</h1>

                            <div className="product-detail-price">
                                <span className="price-current">
                                    ${product.salePrice?.toFixed(2) || product.price.toFixed(2)}
                                </span>
                                {product.salePrice && (
                                    <>
                                        <span className="price-original">${product.price.toFixed(2)}</span>
                                        <span className="price-discount">-{discount}%</span>
                                    </>
                                )}
                            </div>

                            <p className="product-description">{product.description}</p>

                            {/* Size Selector */}
                            <div className="product-options">
                                <label className="option-label">Size</label>
                                <div className="size-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="quantity-selector">
                                <label className="option-label">Quantity</label>
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    −
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                className={`btn btn-primary add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                                onClick={addToCart}
                                style={{
                                    background: addedToCart
                                        ? 'var(--color-success)'
                                        : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                                }}
                            >
                                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>

                            <Link href="/cart" className="btn btn-outline" style={{ width: '100%' }}>
                                View Cart
                            </Link>

                            {/* Features */}
                            <div className="product-features">
                                <div className="feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Free shipping on orders over $100</span>
                                </div>
                                <div className="feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>30-day return policy</span>
                                </div>
                                <div className="feature-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    <span>Premium quality guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <section className="section" style={{ paddingBottom: 0 }}>
                        <div className="section-header">
                            <h2 className="section-title">You May Also Like</h2>
                        </div>
                        <div className="products-grid">
                            {relatedProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
