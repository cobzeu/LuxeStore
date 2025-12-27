import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
    try {
        // Get unique categories from products table
        const { data: products, error } = await supabase
            .from('products')
            .select('category');

        if (error) throw error;

        // Extract unique categories
        const categories = [...new Set(products.map(p => p.category))].filter(Boolean);

        return Response.json({
            success: true,
            categories: categories.map(cat => ({ name: cat, id: cat }))
        });
    } catch (error) {
        console.error('Get categories error:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
