    import { useEffect, useState } from "react";
    import axios from "axios";
    import "../../styles/AdminTables.css";

    export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/all", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        } catch (err) {
        console.error("Failed to fetch users:", err);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        } catch (err) {
        console.error("Failed to delete user:", err);
        }
    };

    return (
        <div className="admin-orders-page container py-5">
        <h2 className="orders-title">👥 Manage Users</h2>

        <div className="table-responsive">
            <table className="orders-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                <tr>
                    <td colSpan="5">No users found.</td>
                </tr>
                ) : (
                users.map((user) => (
                    <tr key={user._id}>
                    <td data-label="Name">{user.name}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Role">{user.role}</td>
                    <td data-label="Registered">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td data-label="Actions">
                        {user.role !== "admin" && (
                        <button
                            className="edit-status-btn"
                            onClick={() => deleteUser(user._id)}
                        >
                            Delete
                        </button>
                        )}
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
    }
