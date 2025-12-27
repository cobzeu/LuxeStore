-- LuxePakistan Product Reviews Table
-- Run this in your Supabase SQL Editor

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id INTEGER NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read approved reviews
CREATE POLICY "Allow public to read approved reviews" ON reviews
    FOR SELECT
    USING (is_approved = true);

-- Policy: Allow anyone to submit reviews
CREATE POLICY "Allow public to submit reviews" ON reviews
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow authenticated users to manage reviews (for admin)
CREATE POLICY "Allow authenticated users to manage reviews" ON reviews
    FOR ALL
    USING (auth.role() = 'authenticated');
