import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg"></div>

            <div className="hero-content">
                <span className="hero-badge">New Season Collection</span>

                <h1 className="hero-title">
                    Elevate Your Style
                </h1>

                <p className="hero-subtitle">
                    Discover our curated collection of premium fashion.
                    From handcrafted shoes to luxury timepieces, find pieces that define elegance.
                </p>

                <div className="hero-cta">
                    <Link href="/shop" className="btn btn-primary">
                        Shop Collection
                    </Link>
                    <Link href="/collections" className="btn btn-secondary">
                        Explore Categories
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
