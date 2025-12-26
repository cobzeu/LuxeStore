-- Create products table for LUXE Fashion Store
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/lpdzugrlrujmwvsxhlfl/sql

-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  category VARCHAR(100),
  image_url TEXT,
  sizes TEXT[],
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Insert product data
INSERT INTO products (name, description, price, sale_price, category, image_url, sizes, in_stock, featured) VALUES
(
  'Luxury Leather Oxford',
  'Handcrafted premium leather oxford shoes with meticulous attention to detail. Features genuine Italian leather upper, cushioned insole for all-day comfort, and classic Goodyear welt construction for durability.',
  249.00,
  199.00,
  'shoes',
  'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80',
  ARRAY['40', '41', '42', '43', '44', '45'],
  true,
  true
),
(
  'Premium Chronograph Watch',
  'Exquisite Swiss-made chronograph with sapphire crystal glass and stainless steel case. Water-resistant to 100m with luminous hands and markers. The perfect blend of elegance and functionality.',
  499.00,
  399.00,
  'watches',
  'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80',
  ARRAY['One Size'],
  true,
  true
),
(
  'Cashmere Blend Scarf',
  'Luxuriously soft cashmere blend scarf perfect for the discerning gentleman or lady. Features subtle weave pattern with fringed edges. Available in versatile neutral tones that complement any outfit.',
  129.00,
  99.00,
  'scarf',
  'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
  ARRAY['One Size'],
  true,
  true
),
(
  'Embroidered Wool Shawl',
  'Exquisite handcrafted wool shawl featuring intricate traditional embroidery. Made from the finest Merino wool for exceptional warmth and softness. A timeless piece that adds elegance to any ensemble.',
  199.00,
  159.00,
  'shawl',
  'https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=800&q=80',
  ARRAY['One Size'],
  true,
  true
),
(
  'Executive Tailored Suit',
  'Impeccably tailored three-piece suit crafted from premium Italian wool. Features half-canvas construction, working sleeve buttons, and pick-stitched lapels. Ready to wear with expert finishing.',
  899.00,
  699.00,
  'suit-stitched',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
  ARRAY['38', '40', '42', '44', '46'],
  true,
  true
),
(
  'Premium Unstitched Fabric Set',
  'Luxurious unstitched fabric set featuring premium Egyptian cotton with subtle texture. Includes 4 meters of suit fabric, 2.5 meters of trouser fabric, and matching lining. Perfect for custom tailoring.',
  399.00,
  299.00,
  'suit-unstitched',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
  ARRAY['Standard Set'],
  true,
  true
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  sale_price = EXCLUDED.sale_price,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  sizes = EXCLUDED.sizes,
  in_stock = EXCLUDED.in_stock,
  featured = EXCLUDED.featured;

-- Verify the data
SELECT id, name, sale_price, category FROM products;
