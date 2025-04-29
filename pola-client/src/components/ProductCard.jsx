    import { Link } from "react-router-dom";
    import { useCart } from "../contexts/CartContext";
    import { useState } from "react";
    import MiniCart from "./MiniCart";
    import axios from "axios";
    import "../styles/ProductCard.css";

    export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [showMiniCart, setShowMiniCart] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setShowMiniCart(true);
        setTimeout(() => setShowMiniCart(false), 4000);
    };

    const toggleWishlist = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
        await axios.post(
            "http://localhost:5000/api/users/wishlist",
            { productId: product._id },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            }
        );
        setLiked(!liked);
        } catch (err) {
        console.error("Wishlist update failed:", err.response?.data || err.message);
        }
    };

    return (
        <>
        <div className="card product-card h-100 shadow-sm position-relative">
            <img
            src={product.imageUrl}
            alt={product.name}
            className="card-img-top"
            />

            <button
            onClick={toggleWishlist}
            className="btn btn-sm position-absolute top-0 end-0 m-2 bg-white rounded-circle shadow wishlist-btn"
            >
            {liked ? "💖" : "🤍"}
            </button>

            <div className="card-body text-center d-flex flex-column">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text text-muted mb-1">{product.price} ₪</p>

            {/* Extra Details (text only) */}
            <div className="mb-3 small text-secondary">
                <div><strong>Size:</strong> {product.size}</div>
                <div><strong>Color:</strong> {product.color}</div>
                <div><strong>Condition:</strong> {product.status}</div>
            </div>

            <div className="d-flex gap-2 mt-auto">
                <Link
                to={`/product/${product._id}`}
                className="btn btn-outline-dark btn-sm w-50"
                >
                View
                </Link>
                <button className="btn btn-dark btn-sm w-50" onClick={handleAdd}>
                Add to Cart
                </button>
            </div>
            </div>
        </div>

        <MiniCart open={showMiniCart} onClose={() => setShowMiniCart(false)} />
        </>
    );
    }
