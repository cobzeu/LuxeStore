import ProductCard from './ProductCard';

export default function FeaturedProducts({ products, onAddToCart }) {
    return (
        <section className="section" id="featured">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Collection</h2>
                    <p className="section-subtitle">
                        Handpicked pieces that embody luxury and sophistication.
                        Each item is carefully selected to elevate your wardrobe.
                    </p>
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
