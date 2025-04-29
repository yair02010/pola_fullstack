    import { useEffect, useState } from "react";
    import { useParams, Link } from "react-router-dom";
    import axios from "axios";

    export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            setOrder(res.data);
        } catch (err) {
            console.error("Error loading order", err);
        }
        };

        fetchOrder();
    }, [id]);

    if (!order) return <div className="container py-5">Loading order...</div>;

    return (
        <div className="container py-5">
        <h2 className="fw-bold mb-4">🧾 Order Details</h2>

        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className={`badge bg-${order.status === "paid" ? "success" : "secondary"}`}>{order.status}</span></p>
        <p><strong>Total:</strong> ₪{order.total}</p>

        <hr />

        <h5 className="fw-bold">Items:</h5>
        <ul className="list-group">
            {order.items.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
                <div>
                {item.name} (x{item.quantity})
                </div>
                <div>₪{item.price * item.quantity}</div>
            </li>
            ))}
        </ul>

        <div className="mt-4">
            <Link to="/my-orders" className="btn btn-outline-dark">Back to My Orders</Link>
        </div>
        </div>
    );
    }
