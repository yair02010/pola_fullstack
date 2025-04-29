    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    });

    const sendOrderConfirmation = async ({ to, name, orderId, totalAmount, paymentMethod }) => {
    const html = `
        <div style="font-family:Arial,sans-serif;padding:20px;color:#333">
        <h2 style="color:#4CAF50">🛒 POLA – Order Confirmation</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for your order <strong>#${orderId}</strong>!</p>
        <p>Your payment method: <strong>${paymentMethod}</strong></p>
        <p>Total amount: <strong>₪${totalAmount}</strong></p>
        <hr />
        <p style="font-size:0.9rem;color:#888">This is an automatic confirmation. We will notify you when your order is ready.</p>
        <p style="margin-top:30px;font-size:0.8rem;color:#aaa">© ${new Date().getFullYear()} POLA. All rights reserved.</p>
        </div>
    `;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: `🧾 POLA - Order Confirmation #${orderId}`,
        html,
    });
    };

    module.exports = sendOrderConfirmation;