// Product data for the store - Pakistani Fashion Collection
// All prices in PKR (Pakistani Rupees)

export const staticProducts = [
    // Products will be added here
    // Categories: men-unstitched, shawls, scarves
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
        count: 0,
        description: "Stylish Scarves Collection",
    },
];

// Get category by slug
export const getCategoryBySlug = (slug) => {
    return categories.find(cat => cat.slug === slug);
};
