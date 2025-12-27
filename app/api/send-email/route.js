import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { order, customerEmail } = await request.json();

        if (!customerEmail) {
            return Response.json({ success: false, error: 'No email provided' }, { status: 400 });
        }

        const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') || 0}`;

        // Build items HTML
        const itemsHtml = order.items.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #333;">
                    <strong>${item.name}</strong><br>
                    <span style="color: #888;">Qty: ${item.quantity}</span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #333; text-align: right;">
                    ${formatPrice(item.price * item.quantity)}
                </td>
            </tr>
        `).join('');

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #c9a96e 0%, #b8944f 100%); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #0a0a0a; font-size: 28px; font-weight: 600;">LuxePakistan</h1>
                            <p style="margin: 8px 0 0; color: #0a0a0a; opacity: 0.8;">Premium Pakistani Fashion</p>
                        </td>
                    </tr>
                    
                    <!-- Order Confirmation -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <span style="display: inline-block; width: 60px; height: 60px; background: rgba(34, 197, 94, 0.1); border-radius: 50%; line-height: 60px; font-size: 30px;">✓</span>
                                <h2 style="color: #ffffff; margin: 20px 0 10px; font-size: 24px;">Order Confirmed!</h2>
                                <p style="color: #888; margin: 0;">Thank you for shopping with us</p>
                            </div>
                            
                            <!-- Order Number -->
                            <div style="background: #252525; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
                                <p style="color: #888; margin: 0 0 5px; font-size: 14px;">Order Number</p>
                                <p style="color: #c9a96e; margin: 0; font-size: 20px; font-weight: 600;">${order.order_number}</p>
                            </div>
                            
                            <!-- Order Items -->
                            <h3 style="color: #ffffff; margin: 0 0 15px; font-size: 16px;">Order Summary</h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                ${itemsHtml}
                            </table>
                            
                            <!-- Order Totals -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #252525; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 12px 15px; color: #888;">Subtotal</td>
                                    <td style="padding: 12px 15px; color: #fff; text-align: right;">${formatPrice(order.subtotal)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 15px; color: #888;">Delivery</td>
                                    <td style="padding: 12px 15px; color: ${order.shipping === 0 ? '#22c55e' : '#fff'}; text-align: right;">${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</td>
                                </tr>
                                <tr style="background: #333;">
                                    <td style="padding: 15px; color: #fff; font-weight: 600;">Total (COD)</td>
                                    <td style="padding: 15px; color: #c9a96e; text-align: right; font-size: 18px; font-weight: 600;">${formatPrice(order.total)}</td>
                                </tr>
                            </table>
                            
                            <!-- Delivery Address -->
                            <div style="margin-top: 30px;">
                                <h3 style="color: #ffffff; margin: 0 0 10px; font-size: 16px;">📍 Delivery Address</h3>
                                <p style="color: #888; margin: 0; line-height: 1.6;">
                                    ${order.customer_name}<br>
                                    ${order.address}<br>
                                    ${order.city}${order.postal_code ? ', ' + order.postal_code : ''}<br>
                                    📱 ${order.phone}
                                </p>
                            </div>
                            
                            <!-- What's Next -->
                            <div style="margin-top: 30px; background: rgba(201, 169, 110, 0.1); border: 1px solid rgba(201, 169, 110, 0.3); border-radius: 8px; padding: 20px;">
                                <h3 style="color: #c9a96e; margin: 0 0 15px; font-size: 16px;">📦 What's Next?</h3>
                                <ul style="color: #888; margin: 0; padding-left: 20px; line-height: 1.8;">
                                    <li>Your order will be dispatched within 1-2 business days</li>
                                    <li>Expected delivery: 2-5 business days</li>
                                    <li>Pay <strong style="color: #c9a96e;">${formatPrice(order.total)}</strong> on delivery</li>
                                </ul>
                            </div>
                            
                            <!-- Contact -->
                            <div style="margin-top: 30px; text-align: center;">
                                <p style="color: #888; margin: 0 0 10px;">Questions? Contact us on WhatsApp</p>
                                <a href="https://wa.me/923486897247" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 500;">📱 0348-6897247</a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #111; padding: 25px 30px; text-align: center;">
                            <p style="color: #666; margin: 0; font-size: 13px;">
                                © ${new Date().getFullYear()} LuxePakistan. All rights reserved.<br>
                                <a href="https://luxepakistan.com" style="color: #c9a96e; text-decoration: none;">luxepakistan.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        const { data, error } = await resend.emails.send({
            from: 'LuxePakistan <orders@luxepakistan.com>',
            to: customerEmail,
            subject: `Order Confirmed - ${order.order_number} | LuxePakistan`,
            html: emailHtml,
        });

        if (error) {
            console.error('Email send error:', error);
            return Response.json({ success: false, error: error.message }, { status: 500 });
        }

        return Response.json({ success: true, messageId: data?.id });
    } catch (error) {
        console.error('Email API error:', error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
