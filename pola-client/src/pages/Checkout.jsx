    import { useCart } from "../contexts/CartContext";
    import axios from "axios";
    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";

    export default function Checkout() {
    const { cart } = useCart();
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [paymentMethod, setPaymentMethod] = useState("cash_in_store");
    const [useCustomAddress, setUseCustomAddress] = useState(false);
    const [userAddress, setUserAddress] = useState({});
    const [customAddress, setCustomAddress] = useState({
        street: "",
        houseNumber: "",
        city: "",
        zipCode: "",
        floor: "",
        apartment: "",
        entrance: "",
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        const fetchUser = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
            });
            setUserAddress(res.data.address || {});
        } catch (err) {
            console.error("Failed to fetch user address:", err);
        }
        };
        fetchUser();
    }, []);

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        const shippingAddress =
        deliveryMethod === "delivery"
            ? useCustomAddress
            ? customAddress
            : userAddress
            : {};

        const orderPayload = {
        items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
        })),
        deliveryMethod,
        paymentMethod,
        shippingAddress,
        };

        try {
        if (paymentMethod === "credit_card") {
            const res = await axios.post("http://localhost:5000/api/payments/checkout", orderPayload, {
            headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data?.url) {
            window.location.href = res.data.url;
            } else {
            alert("Stripe redirect failed.");
            }
        } else {
            const res = await axios.post("http://localhost:5000/api/orders", orderPayload, {
            headers: { Authorization: `Bearer ${token}` },
            });

            navigate(`/success?orderId=${res.data._id}`);
        }
        } catch (err) {
        console.error("Checkout error:", err);
        navigate("/cancel");
        }
    };

    return (
        <div className="container py-5">
        <h2 className="fw-bold mb-4 text-center">🛒 Checkout</h2>

        <div className="mb-3">
            <label className="form-label">Delivery Method:</label>
            <select className="form-select" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
            <option value="pickup">Pickup from Store</option>
            <option value="delivery">Delivery to your address</option>
            </select>
        </div>

        {deliveryMethod === "delivery" && (
            <>
            <div className="form-check mb-2">
                <input
                className="form-check-input"
                type="checkbox"
                checked={useCustomAddress}
                onChange={() => setUseCustomAddress(!useCustomAddress)}
                id="customAddressCheck"
                />
                <label className="form-check-label" htmlFor="customAddressCheck">
                Use different address
                </label>
            </div>

            {useCustomAddress && (
                <div className="row">
                {["street", "houseNumber", "city", "zipCode", "floor", "apartment", "entrance"].map((field) => (
                    <div className="col-md-6 mb-3" key={field}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={field}
                        value={customAddress[field]}
                        onChange={(e) => setCustomAddress({ ...customAddress, [field]: e.target.value })}
                    />
                    </div>
                ))}
                </div>
            )}
            </>
        )}

        <div className="mb-3">
            <label className="form-label">Payment Method:</label>
            <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="credit_card">Credit Card (Stripe)</option>
            <option value="cash_in_store">Cash in Store</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
        </div>

        <ul className="list-group mb-3">
            {cart.map((item) => (
            <li key={item._id} className="list-group-item d-flex justify-content-between">
                {item.name} x {item.quantity}
                <span>₪{item.price * item.quantity}</span>
            </li>
            ))}
            <li className="list-group-item d-flex justify-content-between fw-bold">
            Total <span>₪{total}</span>
            </li>
        </ul>

        <div className="text-center">
            <button className="btn btn-warning px-4 py-2 fw-bold" onClick={handleCheckout}>
            Confirm Order
            </button>
        </div>
        </div>
    );
    }
