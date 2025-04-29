    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import axios from "axios";
    import "../styles/Wishlist.css";

    export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data);
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (id) => {
        const token = localStorage.getItem("token");
        try {
        await axios.delete(`http://localhost:5000/api/users/wishlist/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
        console.error("Failed to remove item:", err);
        }
    };

    return (
        <div className="wishlist-wrapper">
        <div className="container">
            <h2 className="wishlist-title text-center mb-5">💖 Wishlist</h2>

            {wishlist.length > 0 ? (
            <div className="row justify-content-center">
                {wishlist.map((product) => (
                <div key={product._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-10 mb-4">
                    <div className="card product-card h-100 position-relative">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="card-img-top"
                    />

                    <button
                        className="wishlist-remove-btn"
                        onClick={() => handleRemove(product._id)}
                        title="Remove"
                    >
                        ✖
                    </button>

                    <div className="card-body d-flex flex-column text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.price} ₪</p>
                        <div className="small text-start mx-auto" style={{ maxWidth: "85%" }}>
                        <p className="mb-1">
                            <strong>Size:</strong> {product.size}
                        </p>
                        <p className="mb-1">
                            <strong>Color:</strong> {product.color}
                        </p>
                        <p className="mb-3">
                            <strong>Condition:</strong> {product.status}
                        </p>
                        </div>
                        <Link to={`/product/${product._id}`} className="btn btn-outline-dark mt-auto">
                        View Product
                        </Link>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            ) : (
            <p className="text-center text-muted">Your wishlist is empty.</p>
            )}
        </div>
        </div>
    );
    }
