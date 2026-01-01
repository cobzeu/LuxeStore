import Link from 'next/link';

export default function PromoBanner() {
    return (
        <section className="promo-banner">
            <div className="container">
                <div className="promo-content">
                    <h2 className="promo-title">New Year Sale - Up to 50% Off</h2>
                    <p className="promo-text">
                        Premium shawls, elegant scarves & finest unstitched fabrics.
                        Free delivery on orders above Rs. 3,000!
                    </p>
                    <Link href="/shop" className="btn promo-btn">
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
