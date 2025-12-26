'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <main className="policy-page">
                <div className="container">
                    <div className="policy-content">
                        <h1>Privacy Policy</h1>
                        <p className="policy-updated">Last updated: December 2024</p>

                        <section className="policy-section">
                            <h2>Introduction</h2>
                            <p>LuxePakistan ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Information We Collect</h2>
                            <h3>Personal Information</h3>
                            <p>When you make a purchase or create an account, we collect:</p>
                            <ul>
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number (for delivery updates)</li>
                                <li>Shipping address</li>
                                <li>Payment information (processed securely)</li>
                            </ul>

                            <h3>Automatically Collected Information</h3>
                            <ul>
                                <li>Browser type and version</li>
                                <li>Device information</li>
                                <li>IP address</li>
                                <li>Pages visited and time spent</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>How We Use Your Information</h2>
                            <p>We use your information to:</p>
                            <ul>
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and shipping updates</li>
                                <li>Communicate about promotions and new arrivals (with consent)</li>
                                <li>Improve our website and customer service</li>
                                <li>Prevent fraud and ensure security</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Information Sharing</h2>
                            <p>We do not sell your personal information. We may share your data with:</p>
                            <ul>
                                <li><strong>Courier Partners:</strong> To deliver your orders (TCS, Leopards, etc.)</li>
                                <li><strong>Payment Processors:</strong> To process secure payments</li>
                                <li><strong>Legal Requirements:</strong> When required by Pakistani law</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Data Security</h2>
                            <p>We implement security measures to protect your information:</p>
                            <ul>
                                <li>SSL encryption for all transactions</li>
                                <li>Secure password storage</li>
                                <li>Limited access to personal data</li>
                                <li>Regular security audits</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access your personal data</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Lodge a complaint with relevant authorities</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Cookies</h2>
                            <p>We use cookies to:</p>
                            <ul>
                                <li>Remember your preferences</li>
                                <li>Keep items in your shopping cart</li>
                                <li>Analyze website traffic</li>
                                <li>Improve user experience</li>
                            </ul>
                            <p>You can disable cookies in your browser settings, but some features may not work properly.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Third-Party Links</h2>
                            <p>Our website may contain links to external sites. We are not responsible for the privacy practices of these websites.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Changes to This Policy</h2>
                            <p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Contact Us</h2>
                            <p>For privacy-related queries:</p>
                            <ul>
                                <li><strong>WhatsApp:</strong> 0348-6897247</li>
                                <li><strong>Email:</strong> ntextileuniversity@gmail.com</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
