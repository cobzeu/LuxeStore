'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReturnsPolicy() {
    return (
        <>
            <Header />
            <main className="policy-page">
                <div className="container">
                    <div className="policy-content">
                        <h1>Return & Exchange Policy</h1>
                        <p className="policy-updated">Last updated: December 2024</p>

                        <section className="policy-section">
                            <h2>Our Return Promise</h2>
                            <p>At LuxePakistan, we want you to be completely satisfied with your purchase. If you're not happy with your order, we offer hassle-free returns and exchanges within the specified timeframe.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Return Eligibility</h2>
                            <p>Items are eligible for return if:</p>
                            <ul>
                                <li>Return request is made within <strong>7 days</strong> of delivery</li>
                                <li>Product is unused, unwashed, and in original condition</li>
                                <li>All original tags and packaging are intact</li>
                                <li>Product is not altered or customized</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Non-Returnable Items</h2>
                            <p>The following items cannot be returned:</p>
                            <ul>
                                <li>Stitched/altered suits (custom measurements)</li>
                                <li>Undergarments and intimate wear</li>
                                <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                                <li>Items with removed tags or damaged packaging</li>
                                <li>Products showing signs of use or wear</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>How to Return</h2>
                            <ol>
                                <li><strong>Contact Us:</strong> WhatsApp us at 0348-6897247 or email ntextileuniversity@gmail.com</li>
                                <li><strong>Provide Details:</strong> Share your order number and reason for return</li>
                                <li><strong>Get Approval:</strong> Our team will review and approve your request within 24 hours</li>
                                <li><strong>Ship the Item:</strong> Pack the item securely and send it to our address</li>
                                <li><strong>Receive Refund:</strong> Refund processed within 5-7 business days after receiving the item</li>
                            </ol>
                        </section>

                        <section className="policy-section">
                            <h2>Exchange Policy</h2>
                            <p>Want a different size or color? We offer easy exchanges:</p>
                            <ul>
                                <li>Exchange requests within 7 days of delivery</li>
                                <li>Subject to stock availability</li>
                                <li>Free exchange for size-related issues</li>
                                <li>Additional charges may apply for higher-priced items</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Refund Process</h2>
                            <table className="policy-table">
                                <thead>
                                    <tr>
                                        <th>Payment Method</th>
                                        <th>Refund Timeline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cash on Delivery</td>
                                        <td>Bank transfer within 5-7 days</td>
                                    </tr>
                                    <tr>
                                        <td>Bank Transfer / EasyPaisa / JazzCash</td>
                                        <td>Same method within 5-7 days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        <section className="policy-section">
                            <h2>Damaged or Defective Items</h2>
                            <p>If you receive a damaged or defective item:</p>
                            <ul>
                                <li>Report within 24 hours of delivery</li>
                                <li>Share photos/videos of the damage via WhatsApp</li>
                                <li>We will arrange free pickup and replacement</li>
                                <li>Full refund if replacement not available</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Contact Us</h2>
                            <p>For return and exchange queries:</p>
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
