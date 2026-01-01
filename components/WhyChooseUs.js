'use client';

export default function WhyChooseUs() {
    const features = [
        {
            number: "01",
            title: "Curated Selection",
            description: "Every piece in our collection is carefully selected to ensure premium quality, authentic craftsmanship, and timeless elegance."
        },
        {
            number: "02",
            title: "Artisan Excellence",
            description: "We partner with skilled Pakistani artisans who bring generations of expertise to create each beautiful piece."
        },
        {
            number: "03",
            title: "Premium Fabrics",
            description: "From pure wool shawls to fine khaddar suits, we source only the finest materials for unmatched comfort and durability."
        },
        {
            number: "04",
            title: "Exceptional Service",
            description: "From browsing to delivery, we ensure a seamless shopping experience with dedicated customer support."
        }
    ];

    return (
        <section className="why-choose-us section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Choose LuxePakistan</h2>
                    <p className="section-subtitle">
                        Experience the difference of shopping with a brand that truly cares about quality and tradition
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <span className="feature-number">{feature.number}</span>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
