'use client';

import { useState, useEffect } from 'react';
import { getProductReviews, submitReview, getProductRating } from '@/lib/supabase';

// Star Rating Display Component
function StarRating({ rating, size = 18 }) {
    return (
        <div className="star-rating" style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill={star <= rating ? '#c9a96e' : 'none'}
                    stroke="#c9a96e"
                    strokeWidth="2"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );
}

// Interactive Star Rating for Form
function StarRatingInput({ value, onChange }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating-input" style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px'
                    }}
                >
                    <svg
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        fill={(hover || value) >= star ? '#c9a96e' : 'none'}
                        stroke="#c9a96e"
                        strokeWidth="2"
                        style={{ transition: 'transform 0.1s' }}
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                </button>
            ))}
        </div>
    );
}

export default function ReviewSection({ productId, productName }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState({ average: 0, count: 0 });
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        rating: 0,
        title: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadReviews();
    }, [productId]);

    const loadReviews = async () => {
        const [reviewsData, ratingData] = await Promise.all([
            getProductReviews(productId),
            getProductRating(productId)
        ]);
        setReviews(reviewsData);
        setRating(ratingData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
        if (formData.rating === 0) newErrors.rating = 'Please select a rating';
        if (!formData.comment.trim()) newErrors.comment = 'Review is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const result = await submitReview({
            product_id: productId,
            customer_name: formData.customerName,
            customer_email: formData.customerEmail || null,
            rating: formData.rating,
            title: formData.title || null,
            comment: formData.comment
        });

        if (result.success) {
            setSuccessMessage('Thank you for your review!');
            setFormData({ customerName: '', customerEmail: '', rating: 0, title: '', comment: '' });
            setShowForm(false);
            loadReviews();
            setTimeout(() => setSuccessMessage(''), 5000);
        }
        setIsSubmitting(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-PK', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="review-section">
            <div className="review-header">
                <div className="review-summary">
                    <h2>Customer Reviews</h2>
                    {rating.count > 0 && (
                        <div className="rating-overview">
                            <StarRating rating={Math.round(rating.average)} size={22} />
                            <span className="rating-average">{rating.average}</span>
                            <span className="rating-count">({rating.count} {rating.count === 1 ? 'review' : 'reviews'})</span>
                        </div>
                    )}
                </div>
                <button
                    className="btn btn-outline"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : 'Write a Review'}
                </button>
            </div>

            {successMessage && (
                <div className="review-success">
                    ✓ {successMessage}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Write Your Review</h3>

                    <div className="form-group">
                        <label>Your Rating *</label>
                        <StarRatingInput
                            value={formData.rating}
                            onChange={(val) => setFormData(prev => ({ ...prev, rating: val }))}
                        />
                        {errors.rating && <span className="error-message">{errors.rating}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="customerName">Your Name *</label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className={errors.customerName ? 'error' : ''}
                            />
                            {errors.customerName && <span className="error-message">{errors.customerName}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerEmail">Email (optional)</label>
                            <input
                                type="email"
                                id="customerEmail"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleInputChange}
                                placeholder="For order verification"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Review Title (optional)</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Summarize your experience"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Your Review *</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            placeholder="Share your experience with this product..."
                            rows="4"
                            className={errors.comment ? 'error' : ''}
                        />
                        {errors.comment && <span className="error-message">{errors.comment}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            )}

            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <div className="no-reviews">
                        <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-card-header">
                                <div className="reviewer-info">
                                    <span className="reviewer-name">{review.customer_name}</span>
                                    {review.verified_purchase && (
                                        <span className="verified-badge">✓ Verified Purchase</span>
                                    )}
                                </div>
                                <span className="review-date">{formatDate(review.created_at)}</span>
                            </div>
                            <StarRating rating={review.rating} size={16} />
                            {review.title && <h4 className="review-title">{review.title}</h4>}
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
