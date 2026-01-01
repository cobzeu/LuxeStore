import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg"></div>

            <div className="hero-content">
                <span className="hero-badge">Premium Pakistani Fashion</span>

                <h1 className="hero-title">
                    Embrace Elegance
                </h1>

                <p className="hero-subtitle">
                    Discover our exclusive collection of premium unstitched fabrics,
                    luxurious wool shawls, and elegant scarves — crafted for those who
                    appreciate timeless Pakistani artistry and sophistication.
                </p>

                <div className="hero-cta">
                    <Link href="/shop" className="btn btn-primary">
                        Explore Collection
                    </Link>
                    <Link href="/collections/shawls" className="btn btn-secondary">
                        View Shawls
                    </Link>
                </div>


            </div>

            <div className="hero-scroll">
                <span>Scroll to explore</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
