import Link from 'next/link';

export default function Collections({ collections }) {
    return (
        <section className="section" id="collections">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Shop by Collection</h2>
                    <p className="section-subtitle">
                        Browse our carefully curated categories to find your perfect piece.
                    </p>
                </div>

                <div className="collections-grid">
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

                <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
                    <Link href="/collections" className="btn btn-outline">
                        View All Collections
                    </Link>
                </div>
            </div>
        </section>
    );
}
