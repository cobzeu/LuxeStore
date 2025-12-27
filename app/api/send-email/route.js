import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { order, customerEmail } = await request.json();

        if (!customerEmail) {
            return Response.json({ success: false, error: 'No email provided' }, { status: 400 });
        }

        const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') || 0}`;

        // Build items text for plain text version
        const itemsText = order.items.map(item =>
            `- ${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
        ).join('\n');

        // Build items HTML
        const itemsHtml = order.items.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; color: #333;">
                    <strong>${item.name}</strong><br>
                    <span style="color: #666;">Qty: ${item.quantity}</span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right; color: #333;">
                    ${formatPrice(item.price * item.quantity)}
                </td>
            </tr>
        `).join('');

        // Plain text version (important for avoiding spam)
        const textVersion = `
LuxePakistan - Order Confirmed

Hi ${order.customer_name},

Thank you for your order! We're excited to get your items to you.

ORDER DETAILS
Order Number: ${order.order_number}

ITEMS ORDERED:
${itemsText}

Subtotal: ${formatPrice(order.subtotal)}
Delivery: ${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}
Total: ${formatPrice(order.total)}

DELIVERY ADDRESS:
${order.customer_name}
${order.address}
${order.city}${order.postal_code ? ', ' + order.postal_code : ''}
Phone: ${order.phone}

WHAT'S NEXT:
- Your order will be dispatched within 1-2 business days
- Expected delivery: 2-5 business days
- Pay ${formatPrice(order.total)} on delivery (Cash on Delivery)

Need help? Contact us on WhatsApp: 0348-6897247

Thank you for shopping with LuxePakistan!
        `.trim();

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - LuxePakistan</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: #1a1a1a; padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #c9a96e; font-size: 28px; font-weight: 600;">LuxePakistan</h1>
                            <p style="margin: 8px 0 0; color: #999; font-size: 14px;">Premium Pakistani Fashion</p>
                        </td>
                    </tr>
                    
                    <!-- Order Confirmation -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <div style="display: inline-block; width: 60px; height: 60px; background: #e8f5e9; border-radius: 50%; line-height: 60px; font-size: 30px; color: #4caf50;">✓</div>
                                <h2 style="color: #1a1a1a; margin: 20px 0 10px; font-size: 24px;">Order Confirmed!</h2>
                                <p style="color: #666; margin: 0;">Hi ${order.customer_name}, thank you for your order!</p>
                            </div>
                            
                            <!-- Order Number -->
                            <div style="background: #f8f8f8; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center; border: 1px solid #e5e5e5;">
                                <p style="color: #666; margin: 0 0 5px; font-size: 14px;">Order Number</p>
                                <p style="color: #c9a96e; margin: 0; font-size: 20px; font-weight: 600;">${order.order_number}</p>
                            </div>
                            
                            <!-- Order Items -->
                            <h3 style="color: #1a1a1a; margin: 0 0 15px; font-size: 16px; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">Order Summary</h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                                ${itemsHtml}
                            </table>
                            
                            <!-- Order Totals -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f8f8; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
                                <tr>
                                    <td style="padding: 12px 15px; color: #666;">Subtotal</td>
                                    <td style="padding: 12px 15px; color: #333; text-align: right;">${formatPrice(order.subtotal)}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 15px; color: #666;">Delivery</td>
                                    <td style="padding: 12px 15px; color: ${order.shipping === 0 ? '#4caf50' : '#333'}; text-align: right;">${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</td>
                                </tr>
                                <tr style="background: #1a1a1a;">
                                    <td style="padding: 15px; color: #fff; font-weight: 600;">Total (Cash on Delivery)</td>
                                    <td style="padding: 15px; color: #c9a96e; text-align: right; font-size: 18px; font-weight: 600;">${formatPrice(order.total)}</td>
                                </tr>
                            </table>
                            
                            <!-- Delivery Address -->
                            <div style="margin-top: 30px;">
                                <h3 style="color: #1a1a1a; margin: 0 0 10px; font-size: 16px;">Delivery Address</h3>
                                <p style="color: #666; margin: 0; line-height: 1.6; background: #f8f8f8; padding: 15px; border-radius: 8px; border: 1px solid #e5e5e5;">
                                    <strong>${order.customer_name}</strong><br>
                                    ${order.address}<br>
                                    ${order.city}${order.postal_code ? ', ' + order.postal_code : ''}<br>
                                    Phone: ${order.phone}
                                </p>
                            </div>
                            
                            <!-- What's Next -->
                            <div style="margin-top: 30px; background: #fff8e1; border: 1px solid #ffe082; border-radius: 8px; padding: 20px;">
                                <h3 style="color: #f57c00; margin: 0 0 15px; font-size: 16px;">What Happens Next?</h3>
                                <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.8;">
                                    <li>Your order will be dispatched within 1-2 business days</li>
                                    <li>Expected delivery: 2-5 business days</li>
                                    <li>Please keep <strong>${formatPrice(order.total)}</strong> ready for payment on delivery</li>
                                </ul>
                            </div>
                            
                            <!-- Contact -->
                            <div style="margin-top: 30px; text-align: center; padding: 20px; background: #f8f8f8; border-radius: 8px;">
                                <p style="color: #666; margin: 0 0 10px;">Questions about your order?</p>
                                <a href="https://wa.me/923486897247" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: 500;">WhatsApp: 0348-6897247</a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
                            <p style="color: #999; margin: 0; font-size: 13px;">
                                This email was sent by LuxePakistan<br>
                                You received this because you placed an order on our website.<br><br>
                                <a href="mailto:luxepakistan5@gmail.com" style="color: #c9a96e; text-decoration: none;">luxepakistan5@gmail.com</a>
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
            replyTo: 'luxepakistan5@gmail.com',
            subject: `Your LuxePakistan Order ${order.order_number} is Confirmed`,
            html: emailHtml,
            text: textVersion,
        });

        if (error) {
            console.error('Email send error:', error);
            return Response.json({ success: false, error: error.message }, { status: 500 });
        }

        // Send notification to company email
        const adminTextVersion = `
NEW ORDER RECEIVED!

Order Number: ${order.order_number}
Date: ${new Date().toLocaleString('en-PK')}

CUSTOMER DETAILS:
Name: ${order.customer_name}
Phone: ${order.phone}
Email: ${order.email || 'Not provided'}

DELIVERY ADDRESS:
${order.address}
${order.city}${order.postal_code ? ', ' + order.postal_code : ''}

ITEMS ORDERED:
${itemsText}

Subtotal: ${formatPrice(order.subtotal)}
Delivery: ${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}
TOTAL: ${formatPrice(order.total)}

Payment Method: Cash on Delivery

${order.notes ? 'Customer Notes: ' + order.notes : ''}
        `.trim();

        const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>New Order - LuxePakistan</title></head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; overflow: hidden; margin: 0 auto;">
        <tr>
            <td style="background: #1a1a1a; padding: 20px; text-align: center;">
                <h1 style="margin: 0; color: #c9a96e; font-size: 24px;">🛒 New Order Received!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px;">
                <div style="background: #e8f5e9; border: 1px solid #4caf50; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center;">
                    <h2 style="margin: 0; color: #2e7d32;">Order #${order.order_number}</h2>
                    <p style="margin: 5px 0 0; color: #666;">${new Date().toLocaleString('en-PK')}</p>
                </div>

                <h3 style="color: #1a1a1a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">Customer Details</h3>
                <table width="100%" style="margin-bottom: 20px;">
                    <tr><td style="padding: 5px 0; color: #666;">Name:</td><td style="padding: 5px 0;"><strong>${order.customer_name}</strong></td></tr>
                    <tr><td style="padding: 5px 0; color: #666;">Phone:</td><td style="padding: 5px 0;"><strong><a href="tel:${order.phone}">${order.phone}</a></strong></td></tr>
                    <tr><td style="padding: 5px 0; color: #666;">Email:</td><td style="padding: 5px 0;">${order.email || 'Not provided'}</td></tr>
                </table>

                <h3 style="color: #1a1a1a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">Delivery Address</h3>
                <p style="background: #f8f8f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    ${order.address}<br>${order.city}${order.postal_code ? ', ' + order.postal_code : ''}
                </p>

                <h3 style="color: #1a1a1a; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">Order Items</h3>
                <table width="100%" style="margin-bottom: 20px;">
                    ${order.items.map(item => `
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 10px 0;">${item.name} × ${item.quantity}</td>
                            <td style="padding: 10px 0; text-align: right;">${formatPrice(item.price * item.quantity)}</td>
                        </tr>
                    `).join('')}
                </table>

                <table width="100%" style="background: #1a1a1a; border-radius: 8px; overflow: hidden;">
                    <tr><td style="padding: 10px 15px; color: #999;">Subtotal</td><td style="padding: 10px 15px; color: #fff; text-align: right;">${formatPrice(order.subtotal)}</td></tr>
                    <tr><td style="padding: 10px 15px; color: #999;">Delivery</td><td style="padding: 10px 15px; color: #fff; text-align: right;">${order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}</td></tr>
                    <tr style="background: #c9a96e;"><td style="padding: 15px; color: #1a1a1a; font-weight: bold;">TOTAL (COD)</td><td style="padding: 15px; color: #1a1a1a; text-align: right; font-size: 20px; font-weight: bold;">${formatPrice(order.total)}</td></tr>
                </table>

                ${order.notes ? `<div style="margin-top: 20px; background: #fff8e1; border: 1px solid #ffe082; padding: 15px; border-radius: 8px;"><strong>Customer Notes:</strong> ${order.notes}</div>` : ''}
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // Send to company email (non-blocking)
        resend.emails.send({
            from: 'LuxePakistan Orders <orders@luxepakistan.com>',
            to: 'luxepakistan5@gmail.com',
            subject: `🛒 New Order #${order.order_number} - ${formatPrice(order.total)}`,
            html: adminHtml,
            text: adminTextVersion,
        }).catch(err => console.error('Admin email error:', err));

        return Response.json({ success: true, messageId: data?.id });
    } catch (error) {
        console.error('Email API error:', error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

