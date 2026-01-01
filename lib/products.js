// Product data for the store - Pakistani Fashion Collection
// All prices in PKR (Pakistani Rupees)

export const staticProducts = [
    // ============================================
    // SCARVES COLLECTION
    // ============================================
    {
        id: 1,
        name: "Black & White Checkered Wool Scarf",
        sku: "25WSF010-00A-BWH",
        description: "Men & Women Casual Checkered Woolen Muffler Scarf. Wool + Cotton Blend.\n\nCARE:\n• Machine or handwash up to 30°C/86F\n• Gentle cycle\n• Do not dry in direct sunlight\n• Do not bleach\n• Do not iron directly on prints/embroidery\n\nActual colour of the product may vary slightly due to photographic lighting sources or your device.",
        price: 2000,
        salePrice: 1299,
        category: "scarves",
        image: "/images/products/scarves/1st.jpeg",
        featured: true,
        inStock: true,
        material: "Wool + Cotton Blend",
        color: "Black & White",
    },
    {
        id: 2,
        name: "Khaki Plain Wool Scarf",
        sku: "25WSF012-00A-KHK",
        description: "A khaki colored wool scarf with a soft feel and a simple plain finish. Wool + Cotton Blend.\n\nCARE:\n• Machine or handwash up to 30°C/86F\n• Gentle cycle\n• Do not dry in direct sunlight\n• Do not bleach\n• Do not iron directly on prints/embroidery\n\nActual colour of the product may vary slightly due to photographic lighting sources or your device.",
        price: 2000,
        salePrice: 1299,
        category: "scarves",
        image: "/images/products/scarves/2nd.jpeg",
        featured: true,
        inStock: true,
        material: "Wool + Cotton Blend",
        color: "Khaki",
    },
    {
        id: 3,
        name: "Black Plain Wool Scarf",
        sku: "25WSF012-00A-BLK",
        description: "A black wool scarf with a soft feel and a simple plain finish. Wool + Cotton Blend.\n\nCARE:\n• Machine or handwash up to 30°C/86F\n• Gentle cycle\n• Do not dry in direct sunlight\n• Do not bleach\n• Do not iron directly on prints/embroidery\n\nActual colour of the product may vary slightly due to photographic lighting sources or your device.",
        price: 2000,
        salePrice: 1299,
        category: "scarves",
        image: "/images/products/scarves/3rd.jpeg",
        featured: true,
        inStock: true,
        material: "Wool + Cotton Blend",
        color: "Black",
    },
    {
        id: 4,
        name: "Black Striped Wool Scarf",
        sku: "25WSF014-00A-BLK",
        description: "A black wool scarf with a contrast striped pattern and fringed edges. Wool + Cotton Blend.\n\nCARE:\n• Machine or handwash up to 30°C/86F\n• Gentle cycle\n• Do not dry in direct sunlight\n• Do not bleach\n• Do not iron directly on prints/embroidery\n\nActual colour of the product may vary slightly due to photographic lighting sources or your device.",
        price: 2000,
        salePrice: 1299,
        category: "scarves",
        image: "/images/products/scarves/4th.jpeg",
        featured: false,
        inStock: true,
        material: "Wool + Cotton Blend",
        color: "Black",
    },
    {
        id: 5,
        name: "Khaki Tartan Wool Scarf",
        sku: "25WSF011-00A-KHK",
        description: "Khaki colored wool scarf in a classic tartan pattern, finished with soft fringed edges. Wool + Cotton Blend.\n\nCARE:\n• Machine or handwash up to 30°C/86F\n• Gentle cycle\n• Do not dry in direct sunlight\n• Do not bleach\n• Do not iron directly on prints/embroidery\n\nActual colour of the product may vary slightly due to photographic lighting sources or your device.",
        price: 2000,
        salePrice: 1299,
        category: "scarves",
        image: "/images/products/scarves/5th.jpeg",
        featured: false,
        inStock: true,
        material: "Wool + Cotton Blend",
        color: "Khaki",
    },
    {
        id: 6,
        name: "Brown Tartan Wool Scarf",
        sku: "25WSF011-00A-BRO",
        description: "Brown wool scarf in a classic tartan pattern, finished with soft fringed edges. Wool + Cotton Blend.\n\nCARE:\n• Machine or handwash up to 30°C/86F\n• Gentle cycle\n• Do not dry in direct sunlight\n• Do not bleach\n• Do not iron directly on prints/embroidery\n\nActual colour of the product may vary slightly due to photographic lighting sources or your device.",
        price: 2000,
        salePrice: 1299,
        category: "scarves",
        image: "/images/products/scarves/6th.jpeg",
        featured: false,
        inStock: true,
        material: "Wool + Cotton Blend",
        color: "Brown",
    },
];

// Get all products (static for now, can be extended to fetch from database)
export const products = staticProducts;

// Get product by ID
export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};

// Get products by category
export const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
};

// Get featured products
export const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
};

// Categories for the store - Only 3 categories
export const categories = [
    {
        id: 1,
        name: "Men's Unstitched",
        slug: "men-unstitched",
        image: "/images/categories/men-unstitched.jpg",
        count: 0,
        description: "Premium Unstitched Fabric for Men",
    },
    {
        id: 2,
        name: "Shawls",
        slug: "shawls",
        image: "/images/categories/shawls.jpg",
        count: 0,
        description: "Elegant Winter Shawls",
    },
    {
        id: 3,
        name: "Scarves",
        slug: "scarves",
        image: "/images/categories/scarves.jpg",
        count: 6,
        description: "Stylish Scarves Collection",
    },
];

// Get category by slug
export const getCategoryBySlug = (slug) => {
    return categories.find(cat => cat.slug === slug);
};

// Alias exports for backwards compatibility
export const collections = categories;
export const getCollectionBySlug = getCategoryBySlug;
