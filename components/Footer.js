import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="logo">
                            <Image
                                src="/images/logo.svg"
                                alt="LuxePakistan"
                                width={35}
                                height={35}
                                className="logo-image"
                            />
                            <span className="logo-text">LuxePakistan</span>
                        </Link>
                        <p className="footer-description">
                            Premium fashion for the discerning individual.
                            We curate the finest pieces to elevate your style.
                        </p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/luxepakistan5.onlie?utm_source=qr&igsh=Ymd3amhncmplNzZu" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/share/1AeCBUgDf5/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Shop</h4>
                        <nav className="footer-links">
                            <Link href="/shop" className="footer-link">All Products</Link>
                            <Link href="/collections/men-unstitched" className="footer-link">Men's Unstitched</Link>
                            <Link href="/collections/shawls" className="footer-link">Shawls</Link>
                            <Link href="/collections/scarves" className="footer-link">Scarves</Link>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Policies</h4>
                        <nav className="footer-links">
                            <Link href="/shipping" className="footer-link">Shipping & Delivery</Link>
                            <Link href="/returns" className="footer-link">Returns & Exchange</Link>
                            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
                            <Link href="/terms" className="footer-link">Terms of Service</Link>
                        </nav>
                    </div>

                    <div className="footer-column">
                        <h4>Contact Us</h4>
                        <nav className="footer-links">
                            <a href="mailto:luxepakistan5@gmail.com" className="footer-link">
                                📧 luxepakistan5@gmail.com
                            </a>
                            <a href="https://wa.me/923486897247" target="_blank" rel="noopener noreferrer" className="footer-link">
                                📱 WhatsApp: 0348-6897247
                            </a>
                            <Link href="/cart" className="footer-link">View Cart</Link>
                        </nav>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} LuxePakistan. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
