import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lpdzugrlrujmwvsxhlfl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZHp1Z3JscnVqbXd2c3hobGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NTE5MDUsImV4cCI6MjA4MjMyNzkwNX0.61ds_fGlpaW0Mjt7QNxZpww-8c0Bb3y9aLQPE0C_lOM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations

// Get all products
export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data;
}

// Get single product by ID
export async function getProduct(id) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    return data;
}

// Get products by category
export async function getProductsByCategory(category) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);

    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
    return data;
}

// Get featured products
export async function getFeaturedProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true);

    if (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
    return data;
}

// Create a new order (COD checkout)
export async function createOrder(orderData) {
    const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

    if (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }
    return { success: true, order: data };
}

// Get order by order number
export async function getOrderByNumber(orderNumber) {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

    if (error) {
        console.error('Error fetching order:', error);
        return null;
    }
    return data;
}

// Get reviews for a product
export async function getProductReviews(productId) {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
    return data;
}

// Submit a new review
export async function submitReview(reviewData) {
    const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();

    if (error) {
        console.error('Error submitting review:', error);
        return { success: false, error: error.message };
    }
    return { success: true, review: data };
}

// Get average rating for a product
export async function getProductRating(productId) {
    const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId)
        .eq('is_approved', true);

    if (error || !data || data.length === 0) {
        return { average: 0, count: 0 };
    }

    const total = data.reduce((sum, review) => sum + review.rating, 0);
    return {
        average: Math.round((total / data.length) * 10) / 10,
        count: data.length
    };
}
