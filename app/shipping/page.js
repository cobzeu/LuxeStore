'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ShippingPolicy() {
    return (
        <>
            <Header />
            <main className="policy-page">
                <div className="container">
                    <div className="policy-content">
                        <h1>Shipping & Delivery Policy</h1>
                        <p className="policy-updated">Last updated: December 2024</p>

                        <section className="policy-section">
                            <h2>Delivery Areas</h2>
                            <p>We deliver to all major cities and towns across Pakistan including:</p>
                            <ul>
                                <li>Karachi, Lahore, Islamabad, Rawalpindi</li>
                                <li>Faisalabad, Multan, Peshawar, Quetta</li>
                                <li>Sialkot, Gujranwala, Hyderabad, Sukkur</li>
                                <li>All other cities and towns via courier partners</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Delivery Timeline</h2>
                            <table className="policy-table">
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Delivery Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Major Cities (Karachi, Lahore, Islamabad)</td>
                                        <td>2-3 Business Days</td>
                                    </tr>
                                    <tr>
                                        <td>Other Cities</td>
                                        <td>3-5 Business Days</td>
                                    </tr>
                                    <tr>
                                        <td>Remote Areas</td>
                                        <td>5-7 Business Days</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p><strong>Note:</strong> Delivery times may vary during Eid, public holidays, or extreme weather conditions.</p>
                        </section>

                        <section className="policy-section">
                            <h2>Shipping Charges</h2>
                            <ul>
                                <li><strong>Free Shipping:</strong> On orders above Rs. 5,000</li>
                                <li><strong>Standard Delivery:</strong> Rs. 350 for orders below Rs. 5,000</li>
                                <li><strong>Cash on Delivery (COD):</strong> Available nationwide</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Order Tracking</h2>
                            <p>Once your order is dispatched, you will receive:</p>
                            <ul>
                                <li>SMS notification with tracking number</li>
                                <li>WhatsApp update on order status</li>
                                <li>Email confirmation with courier details</li>
                            </ul>
                            <p>You can track your order via our courier partners or contact us on WhatsApp: <strong>0348-6897247</strong></p>
                        </section>

                        <section className="policy-section">
                            <h2>Delivery Process</h2>
                            <ol>
                                <li>Order confirmation via SMS/WhatsApp within 24 hours</li>
                                <li>Order processing and quality check (1-2 days)</li>
                                <li>Dispatch and courier handover</li>
                                <li>Delivery to your doorstep</li>
                                <li>Payment collection (for COD orders)</li>
                            </ol>
                        </section>

                        <section className="policy-section">
                            <h2>Important Notes</h2>
                            <ul>
                                <li>Please ensure someone is available to receive the parcel</li>
                                <li>Verify the package before accepting delivery</li>
                                <li>Report any damages immediately to the courier</li>
                                <li>Keep your phone accessible for delivery updates</li>
                            </ul>
                        </section>

                        <section className="policy-section">
                            <h2>Contact Us</h2>
                            <p>For shipping inquiries:</p>
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
