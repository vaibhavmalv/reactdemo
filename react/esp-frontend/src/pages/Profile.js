import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../store/user/userThunks";
import { logout } from "../store/auth/authSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token, loading } = useSelector((state) => state.auth);

    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ firstName: "", lastName: "" });
    const [fetching, setFetching] = useState(false);

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    // Fetch profile if not available
    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [user, dispatch]);

    // Fetch user's info
    useEffect(() => {
        if (user) fetchUsers();
    }, [user]);

    const fetchUsers = async () => {
        setFetching(true);
        try {
            const res = await axios.get("http://localhost:5000/api/userinfo/getAllUserInfo", config);
            const currentUserData = res.data.filter((u) => u.userId === user.id);
            setUsers(currentUserData);
        } catch (err) {
            console.error("FETCH ERROR:", err.response?.data || err.message);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.firstName || !form.lastName) {
            alert("Both fields are required");
            return;
        }

        const data = { ...form, userId: user.id };

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/userinfo/updateUserInfo/${editId}`, data, config);
                alert("Updated successfully");
            } else {
                await axios.post("http://localhost:5000/api/userinfo/createUserInfo", data, config);
                alert("Saved successfully");
            }

            setForm({ firstName: "", lastName: "" });
            setEditId(null);
            fetchUsers();
        } catch (err) {
            console.error("SAVE ERROR:", err.response?.data || err.message);
            alert("Error saving data");
        }
    };

    const handleEdit = (userData) => {
        setForm({ firstName: userData.firstName, lastName: userData.lastName });
        setEditId(userData._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/userinfo/deleteUserInfo/${id}`, config);
            fetchUsers();
        } catch (err) {
            console.error("DELETE ERROR:", err.response?.data || err.message);
            alert("Error deleting data");
        }
    };

    if (loading || fetching || !user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>

            <button
                onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                }}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Logout
            </button>

            <div className="mt-6">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border p-2 mr-2 rounded"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleSubmit}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {editId ? "Update" : "Save"}
                </button>

                <hr className="my-4" />

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">First</th>
                            <th className="border p-2">Last</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((userData) => (
                                <tr key={userData._id}>
                                    <td className="border p-2">{userData.firstName}</td>
                                    <td className="border p-2">{userData.lastName}</td>
                                    <td className="border p-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(userData)}
                                            className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(userData._id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-2">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
