// Product data for the store - expanded catalog
// Supports both static rendering and Supabase integration

export const staticProducts = [
    // ===== SHOES =====
    {
        id: 1,
        name: "Luxury Leather Oxford",
        description: "Handcrafted premium leather oxford shoes with meticulous attention to detail. Features genuine Italian leather upper, cushioned insole for all-day comfort, and classic Goodyear welt construction for durability.",
        price: 249.00,
        salePrice: 199.00,
        sale_price: 199.00,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80",
        sizes: ["40", "41", "42", "43", "44", "45"],
        in_stock: true,
        featured: true,
    },
    {
        id: 7,
        name: "Classic Brown Derby",
        description: "Elegantly crafted brown derby shoes made from full-grain calfskin leather. Perfect for formal occasions with their timeless silhouette and hand-burnished finish.",
        price: 229.00,
        salePrice: 189.00,
        sale_price: 189.00,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
        sizes: ["40", "41", "42", "43", "44"],
        in_stock: true,
        featured: false,
    },
    {
        id: 8,
        name: "Premium Suede Loafers",
        description: "Luxurious suede loafers with hand-sewn moccasin construction. Features leather lining and cushioned insole for exceptional comfort.",
        price: 199.00,
        salePrice: 159.00,
        sale_price: 159.00,
        category: "shoes",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
        sizes: ["40", "41", "42", "43", "44", "45"],
        in_stock: true,
        featured: false,
    },

    // ===== WATCHES =====
    {
        id: 2,
        name: "Premium Chronograph Watch",
        description: "Exquisite Swiss-made chronograph with sapphire crystal glass and stainless steel case. Water-resistant to 100m with luminous hands and markers. The perfect blend of elegance and functionality.",
        price: 499.00,
        salePrice: 399.00,
        sale_price: 399.00,
        category: "watches",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        id: 9,
        name: "Minimalist Gold Watch",
        description: "Sophisticated minimalist timepiece with rose gold case and genuine leather strap. Japanese quartz movement ensures precise timekeeping. A statement piece for the modern professional.",
        price: 349.00,
        salePrice: 279.00,
        sale_price: 279.00,
        category: "watches",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        id: 10,
        name: "Classic Silver Dress Watch",
        description: "Timeless silver dress watch with mother-of-pearl dial. Features slim profile design perfect for formal wear. Swiss movement with 5-year warranty.",
        price: 429.00,
        salePrice: 349.00,
        sale_price: 349.00,
        category: "watches",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: false,
    },

    // ===== SCARVES =====
    {
        id: 3,
        name: "Cashmere Blend Scarf",
        description: "Luxuriously soft cashmere blend scarf perfect for the discerning gentleman or lady. Features subtle weave pattern with fringed edges. Available in versatile neutral tones that complement any outfit.",
        price: 129.00,
        salePrice: 99.00,
        sale_price: 99.00,
        category: "scarf",
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        id: 11,
        name: "Silk Paisley Scarf",
        description: "Elegant 100% pure silk scarf featuring classic paisley pattern. Hand-rolled edges with luxurious drape. Perfect for adding sophistication to any ensemble.",
        price: 159.00,
        salePrice: 129.00,
        sale_price: 129.00,
        category: "scarf",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: false,
    },

    // ===== SHAWLS =====
    {
        id: 4,
        name: "Embroidered Wool Shawl",
        description: "Exquisite handcrafted wool shawl featuring intricate traditional embroidery. Made from the finest Merino wool for exceptional warmth and softness. A timeless piece that adds elegance to any ensemble.",
        price: 199.00,
        salePrice: 159.00,
        sale_price: 159.00,
        category: "shawl",
        image: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },
    {
        id: 12,
        name: "Pashmina Kashmir Shawl",
        description: "Authentic Pashmina shawl handwoven by artisans in Kashmir. Ultra-fine cashmere fibers create exceptional warmth without bulk. A luxurious investment piece.",
        price: 299.00,
        salePrice: 249.00,
        sale_price: 249.00,
        category: "shawl",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
        sizes: ["One Size"],
        in_stock: true,
        featured: true,
    },

    // ===== SUITS - STITCHED =====
    {
        id: 5,
        name: "Executive Tailored Suit",
        description: "Impeccably tailored three-piece suit crafted from premium Italian wool. Features half-canvas construction, working sleeve buttons, and pick-stitched lapels. Ready to wear with expert finishing.",
        price: 899.00,
        salePrice: 699.00,
        sale_price: 699.00,
        category: "suit-stitched",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        sizes: ["38", "40", "42", "44", "46"],
        in_stock: true,
        featured: true,
    },
    {
        id: 13,
        name: "Navy Blue Business Suit",
        description: "Classic navy blue two-piece suit in lightweight wool blend. Perfect for year-round wear with modern slim fit. Features notch lapels and double-vented back.",
        price: 749.00,
        salePrice: 599.00,
        sale_price: 599.00,
        category: "suit-stitched",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        sizes: ["38", "40", "42", "44", "46", "48"],
        in_stock: true,
        featured: false,
    },
    {
        id: 14,
        name: "Charcoal Gray Formal Suit",
        description: "Sophisticated charcoal gray suit with subtle pinstripe pattern. Full-canvas construction for superior drape. Includes matching trousers with extended waistband.",
        price: 849.00,
        salePrice: 679.00,
        sale_price: 679.00,
        category: "suit-stitched",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
        sizes: ["38", "40", "42", "44", "46"],
        in_stock: true,
        featured: false,
    },

    // ===== SUITS - UNSTITCHED =====
    {
        id: 6,
        name: "Premium Unstitched Fabric Set",
        description: "Luxurious unstitched fabric set featuring premium Egyptian cotton with subtle texture. Includes 4 meters of suit fabric, 2.5 meters of trouser fabric, and matching lining. Perfect for custom tailoring.",
        price: 399.00,
        salePrice: 299.00,
        sale_price: 299.00,
        category: "suit-unstitched",
        image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
        sizes: ["Standard Set"],
        in_stock: true,
        featured: true,
    },
    {
        id: 15,
        name: "Italian Wool Fabric Collection",
        description: "Premium Italian wool fabric in rich burgundy. Includes 4.5 meters of jacket fabric and 3 meters of trouser fabric. Perfect weight for formal occasions.",
        price: 449.00,
        salePrice: 359.00,
        sale_price: 359.00,
        category: "suit-unstitched",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80",
        sizes: ["Standard Set"],
        in_stock: true,
        featured: false,
    },
    {
        id: 16,
        name: "Linen Blend Summer Fabric",
        description: "Breathable linen-cotton blend fabric in light beige. Perfect for summer suits and casual wear. Includes 4 meters of suit fabric with natural texture.",
        price: 299.00,
        salePrice: 239.00,
        sale_price: 239.00,
        category: "suit-unstitched",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
        image_url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
        sizes: ["Standard Set"],
        in_stock: true,
        featured: false,
    },
];

// Collections/Categories with updated counts
export const collections = [
    {
        id: 1,
        name: "Shoes",
        slug: "shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        count: 3,
        description: "Premium handcrafted footwear",
    },
    {
        id: 2,
        name: "Watches",
        slug: "watches",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
        count: 3,
        description: "Luxury timepieces",
    },
    {
        id: 3,
        name: "Scarves",
        slug: "scarf",
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
        count: 2,
        description: "Elegant scarves and accessories",
    },
    {
        id: 4,
        name: "Shawls",
        slug: "shawl",
        image: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?w=800&q=80",
        count: 2,
        description: "Handcrafted premium shawls",
    },
    {
        id: 5,
        name: "Stitched Suits",
        slug: "suit-stitched",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        count: 3,
        description: "Ready-to-wear tailored suits",
    },
    {
        id: 6,
        name: "Unstitched Fabric",
        slug: "suit-unstitched",
        image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
        count: 3,
        description: "Premium fabrics for custom tailoring",
    },
];

// Export products with normalized fields for frontend
export const products = staticProducts.map(p => ({
    ...p,
    image: p.image || p.image_url,
    salePrice: p.salePrice || p.sale_price,
}));

// Get product by ID
export function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Get products by category
export function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

// Get featured products
export function getFeaturedProducts() {
    return products.filter(p => p.featured);
}

// Get collection by slug
export function getCollectionBySlug(slug) {
    return collections.find(c => c.slug === slug);
}
