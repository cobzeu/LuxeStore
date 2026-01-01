'use client';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Ahmed Khan",
            location: "Lahore",
            rating: 5,
            text: "Excellent quality shawls! The wool is so soft and warm. Delivery was quick and the packaging was premium. Will definitely order again.",
            product: "Brown Jacquard Wool Shawl"
        },
        {
            name: "Fatima Rizvi",
            location: "Karachi",
            rating: 5,
            text: "I ordered scarves for my family and everyone loved them. The colors are exactly as shown and the quality is outstanding. Great value for money!",
            product: "Khaki Tartan Wool Scarf"
        },
        {
            name: "Usman Ali",
            location: "Islamabad",
            rating: 5,
            text: "The khaddar suit fabric is premium quality. Perfect for winter. The customer service was very helpful when I had questions about sizes.",
            product: "Blue Khaddar Unstitched Suit"
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i < rating ? "#c9a96e" : "none"}
                stroke="#c9a96e"
                strokeWidth="2"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ));
    };

    return (
        <section className="testimonials section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <p className="section-subtitle">
                        Join thousands of satisfied customers who trust LuxePakistan for their fashion needs
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-rating">
                                {renderStars(testimonial.rating)}
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="author-info">
                                    <span className="author-name">{testimonial.name}</span>
                                    <span className="author-location">{testimonial.location}</span>
                                </div>
                            </div>
                            <span className="testimonial-product">Purchased: {testimonial.product}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
