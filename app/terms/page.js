'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
    return (
        <>
            <Header />
            <main className="policy-page">
                <div className="container">
                    <div className="policy-content">
                        <h1>Terms of Service</h1>
                        <p className="policy-updated">Last updated: December 2024</p>

                        <section className="policy-section">
                            <h2>Agreement to Terms</h2>
                            <p>By accessing or using the LuxePakistan website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Use of Website</h2>
                            <p>By using our website, you agree to:</p>
                            <ul>
                                <li>Provide accurate and complete information</li>
                                <li>Use the website for lawful purposes only</li>
                                <li>Not interfere with the website's functionality</li>
                                <li>Not attempt unauthorized access to our systems</li>
                                <li>Comply with all applicable Pakistani laws</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Account Registration</h2>
                            <p>When creating an account:</p>
                            <ul>
                                <li>You must be at least 18 years old</li>
                                <li>Provide accurate personal information</li>
                                <li>Keep your password confidential</li>
                                <li>Notify us of any unauthorized account use</li>
                                <li>You are responsible for all activities under your account</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Products and Pricing</h2>
                            <ul>
                                <li>All prices are in Pakistani Rupees (PKR)</li>
                                <li>Prices are subject to change without notice</li>
                                <li>We reserve the right to correct pricing errors</li>
                                <li>Product images are for illustration purposes</li>
                                <li>Actual colors may vary slightly from images</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Orders and Payment</h2>
                            <ul>
                                <li>Orders are subject to acceptance and availability</li>
                                <li>We reserve the right to refuse or cancel orders</li>
                                <li>Payment must be made in full before dispatch (except COD)</li>
                                <li>Cash on Delivery (COD) is available nationwide</li>
                                <li>Order confirmation is sent via SMS/WhatsApp</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Intellectual Property</h2>
                            <p>All content on this website is protected:</p>
                            <ul>
                                <li>Images, logos, and designs are our property</li>
                                <li>Content may not be copied or reproduced</li>
                                <li>Trademarks may not be used without permission</li>
                                <li>User-generated content grants us usage rights</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Limitation of Liability</h2>
                            <p>LuxePakistan shall not be liable for:</p>
                            <ul>
                                <li>Indirect or consequential damages</li>
                                <li>Loss of profits or business interruption</li>
                                <li>Delays beyond our reasonable control</li>
                                <li>Third-party actions or services</li>
                            </ul>
                            <p>Our maximum liability is limited to the purchase price of the product.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Dispute Resolution</h2>
                            <p>Any disputes will be resolved:</p>
                            <ul>
                                <li>First through friendly negotiation</li>
                                <li>If unresolved, through mediation</li>
                                <li>Finally, through courts in Pakistan</li>
                                <li>Governed by Pakistani law</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Modifications</h2>
                            <p>We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of new terms.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Contact Us</h2>
                            <p>For questions about these terms:</p>
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
