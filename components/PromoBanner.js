import Link from 'next/link';

export default function PromoBanner() {
    return (
        <section className="promo-banner">
            <div className="container">
                <div className="promo-content">
                    <h2 className="promo-title">Winter Sale - Up to 30% Off</h2>
                    <p className="promo-text">
                        Elevate your wardrobe with our premium collection.
                        Limited time offer on selected items.
                    </p>
                    <Link href="/shop" className="btn promo-btn">
                        Shop the Sale
                    </Link>
                </div>
            </div>
        </section>
    );
}
