import { createClient } from '@supabase/supabase-js';

// Admin API route - uses service role key for full access
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
    try {
        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return Response.json(
                { success: false, error: 'Missing orderId or status' },
                { status: 400 }
            );
        }

        // Validate status
        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return Response.json(
                { success: false, error: 'Invalid status' },
                { status: 400 }
            );
        }

        // Update order status
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;

        return Response.json({
            success: true,
            order: data
        });
    } catch (error) {
        console.error('Update order error:', error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
