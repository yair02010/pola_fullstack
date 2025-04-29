    import { useEffect, useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";
    import { format } from "date-fns";
    import { Link } from "react-router-dom";
    import "../../styles/ManageOrders.css";

    export default function ManageOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error("Failed to load orders ❌");
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Order status updated ✅");
        fetchOrders();
        } catch (err) {
        console.error("Failed to update status:", err);
        toast.error("Failed to update status ❌");
        }
    };

    return (
        <div className="admin-page container py-5">
        <h2 className="page-title mb-4">📦 Manage Orders</h2>

        <div className="table-responsive shadow-sm rounded-4">
            <table className="table align-middle bg-white">
            <thead className="table-light">
                <tr>
                <th>#</th>
                <th>User</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
                <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.user?.name || "Unknown"}</td>
                    <td>₪{order.totalAmount.toLocaleString()}</td>
                    <td>{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
                    <td>
                    <span className={`badge bg-${
                        order.status === "pending" ? "warning" :
                        order.status === "paid" ? "success" :
                        order.status === "shipped" ? "info" : "secondary"
                    }`}>
                        {order.status}
                    </span>
                    </td>
                    <td>
                    <select
                        className="form-select form-select-sm"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    </td>
                    <td>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-sm btn-outline-primary">
                        View
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
    }
