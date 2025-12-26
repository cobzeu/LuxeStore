'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product, onAddToCart }) {
    const discount = product.salePrice
        ? Math.round((1 - product.salePrice / product.price) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    const getCategoryLabel = (category) => {
        const labels = {
            'shawl': 'Shawls',
            'muffler': 'Mufflers',
            'suit-stitched': 'Stitched Suits',
            'suit-unstitched': 'Unstitched',
        };
        return labels[category] || category;
    };

    // Format price in PKR
    const formatPrice = (price) => {
        return `Rs. ${price.toLocaleString('en-PK')}`;
    };

    return (
        <Link href={`/products/${product.id}`} className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />

                {discount > 0 && (
                    <span className="product-badge">-{discount}%</span>
                )}

                <div className="product-actions">
                    <button
                        className="product-action-btn"
                        aria-label="Quick view"
                        onClick={(e) => e.preventDefault()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>

                    <button
                        className="product-action-btn"
                        aria-label="Add to wishlist"
                        onClick={(e) => e.preventDefault()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>

                    <button
                        className="product-action-btn"
                        aria-label="Add to cart"
                        onClick={handleAddToCart}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="product-info">
                <span className="product-category">{getCategoryLabel(product.category)}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                    <span className="product-price-current">
                        {formatPrice(product.salePrice || product.price)}
                    </span>
                    {product.salePrice && (
                        <span className="product-price-original">{formatPrice(product.price)}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
