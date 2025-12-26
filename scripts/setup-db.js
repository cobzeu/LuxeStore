// Script to set up Supabase database and seed products
// Run with: node scripts/setup-db.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lpdzugrlrujmwvsxhlfl.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwZHp1Z3JscnVqbXd2c3hobGZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njc1MTkwNSwiZXhwIjoyMDgyMzI3OTA1fQ.fLIQafagp5i6R3aVbfrmp3j0UtkncqLmSw0IzIzApbo';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Product data to seed
const products = [
    {
        name: "Luxury Leather Oxford",
        description: "Handcrafted premium leather oxford shoes with meticulous attention to detail. Features genuine Italian leather upper, cushioned insole for all-day comfort, and classic Goodyear welt construction for durability.",
        price: 249.00,
        sale_price: 199.00,
        category: "shoes",
        image_url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
        sizes: ["40", "41", "42", "43", "44", "45"],
        in_stock: true,
        featured: true,
    },
    {
        name: "Premium Chronograph Watch",
        description: "Exquisite Swiss-made chronograph with sapphire crystal glass and stainless steel case. Water-resistant to 100m with luminous hands and markers. The perfect blend of elegance and functionality.",
        price: 499.00,
        sale_price: 399.00,
        category: "watches",
        image_url: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        name: "Cashmere Blend Scarf",
        description: "Luxuriously soft cashmere blend scarf perfect for the discerning gentleman or lady. Features subtle weave pattern with fringed edges. Available in versatile neutral tones that complement any outfit.",
        price: 129.00,
        sale_price: 99.00,
        category: "scarf",
        image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        name: "Embroidered Wool Shawl",
        description: "Exquisite handcrafted wool shawl featuring intricate traditional embroidery. Made from the finest Merino wool for exceptional warmth and softness. A timeless piece that adds elegance to any ensemble.",
        price: 199.00,
        sale_price: 159.00,
        category: "shawl",
        image_url: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        name: "Executive Tailored Suit",
        description: "Impeccably tailored three-piece suit crafted from premium Italian wool. Features half-canvas construction, working sleeve buttons, and pick-stitched lapels. Ready to wear with expert finishing.",
        price: 899.00,
        sale_price: 699.00,
        category: "suit-stitched",
        image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        sizes: ["38", "40", "42", "44", "46"],
        in_stock: true,
        featured: true,
    },
    {
        name: "Premium Unstitched Fabric Set",
        description: "Luxurious unstitched fabric set featuring premium Egyptian cotton with subtle texture. Includes 4 meters of suit fabric, 2.5 meters of trouser fabric, and matching lining. Perfect for custom tailoring.",
        price: 399.00,
        sale_price: 299.00,
        category: "suit-unstitched",
        image_url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
        sizes: ["Standard Set"],
        in_stock: true,
        featured: true,
    },
];

async function setupDatabase() {
    console.log('🚀 Setting up Supabase database...\n');

    // Create products table using SQL
    console.log('📦 Creating products table...');

    const { error: tableError } = await supabase.rpc('exec_sql', {
        sql: `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
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
    `
    });

    if (tableError) {
        console.log('ℹ️  Table might already exist or using direct SQL. Proceeding with insert...');
    }

    // Insert products
    console.log('🌱 Seeding products...');

    const { data, error: insertError } = await supabase
        .from('products')
        .upsert(products, {
            onConflict: 'name',
            ignoreDuplicates: false
        })
        .select();

    if (insertError) {
        console.error('❌ Error inserting products:', insertError.message);
        console.log('\n⚠️  You may need to create the table manually in Supabase Dashboard.');
        console.log('   Go to: https://supabase.com/dashboard/project/lpdzugrlrujmwvsxhlfl/sql');
        console.log('   And run the SQL from scripts/create-table.sql');
        return;
    }

    console.log(`✅ Successfully inserted ${data?.length || 0} products!\n`);
    console.log('Products:');
    data?.forEach(p => console.log(`   - ${p.name} ($${p.sale_price})`));
}

setupDatabase().catch(console.error);
