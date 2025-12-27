import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return Response.json({
            success: true,
            products: products || []
        });
    } catch (error) {
        console.error('Get products error:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const productData = await request.json();

        // Validate required fields
        if (!productData.name || !productData.price || !productData.category) {
            return Response.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (error) throw error;

        return Response.json({
            success: true,
            product: data
        });
    } catch (error) {
        console.error('Create product error:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
