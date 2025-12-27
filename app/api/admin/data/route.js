import { createClient } from '@supabase/supabase-js';

// Admin API route - uses service role key for full access
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key for admin operations
);

export async function GET(request) {
    try {
        // Get all orders
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        // Calculate stats
        const stats = {
            orders: orders?.length || 0,
            revenue: orders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0,
            pending: orders?.filter(o => o.status === 'pending')?.length || 0,
            products: 29 // Static for now, can be fetched from products table later
        };

        return Response.json({
            success: true,
            stats,
            orders
        });
    } catch (error) {
        console.error('Admin data error:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
