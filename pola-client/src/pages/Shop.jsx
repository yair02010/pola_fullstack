    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import axios from "axios";
    import ProductCard from "../components/ProductCard";
    import "../styles/Shop.css"; // ודא שהקובץ קיים

    export default function Shop() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        let list = [...products];

        if (selectedCategory) {
        list = list.filter((p) => p.category?.name === selectedCategory);
        }

        if (search.trim() !== "") {
        list = list.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        }

        if (sort === "priceLow") {
        list.sort((a, b) => a.price - b.price);
        } else if (sort === "priceHigh") {
        list.sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setFiltered(list);
    }, [selectedCategory, products, search, sort]);

    const fetchProducts = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        } catch (err) {
        console.error("Error loading products:", err);
        }
    };

    const fetchCategories = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
        } catch (err) {
        console.error("Error loading categories:", err);
        }
    };

    return (
        <div className="container shop-page">
        <div className="row">
            {/* Sidebar Filters */}
            <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Filter by Category</h5>
            <ul className="list-group">
                <li
                className={`list-group-item ${!selectedCategory && "active"}`}
                onClick={() => setSelectedCategory("")}
                >
                All
                </li>
                {categories.map((cat) => (
                <li
                    key={cat._id}
                    className={`list-group-item ${
                    selectedCategory === cat.name && "active"
                    }`}
                    onClick={() => setSelectedCategory(cat.name)}
                >
                    {cat.name}
                </li>
                ))}
            </ul>
            </div>

            {/* Main Content */}
            <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h4 className="fw-bold m-0">Shop Items</h4>
                <div className="d-flex gap-2 w-75">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="form-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
                </div>
            </div>

            <div className="row">
                {filtered.length > 0 ? (
                filtered.map((product) => (
                    <div key={product._id} className="col-md-4 col-sm-6 mb-4">
                    <ProductCard product={product} />
                    </div>
                ))
                ) : (
                <p className="text-center">No products found.</p>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    }
