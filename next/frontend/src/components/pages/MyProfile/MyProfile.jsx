"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

import { fetchUserProfile } from "@/store/user/userThunks";
import { logout } from "@/store/auth/authSlice";
import { toast } from "react-toastify";

const MyProfile = () => {
    const dispatch = useDispatch();
    const { user, token, loading } = useSelector((state) => state.auth);


    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({ firstName: "", lastName: "" });
    const [fetching, setFetching] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    useEffect(() => setHydrated(true), []);

    // Fetch profile if not available
    useEffect(() => {
        if (!user) {
            dispatch(fetchUserProfile());
        }
    }, [user, dispatch]);

    // Fetch user info
    useEffect(() => {
        if (user) fetchUsers();
    }, [user]);

    const fetchUsers = async () => {
        setFetching(true);
        try {
            const res = await axios.get(
                "http://localhost:5000/api/userinfo/getAllUserInfo",
                config
            );

            const currentUserData = res.data.filter(
                (u) => u.userId === user.id
            );

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName) {
            alert("Both fields are required");
            return;
        }

        const data = { ...form, userId: user.id };

        try {
            if (editId) {
                await axios.put(
                    `http://localhost:5000/api/userinfo/updateUserInfo/${editId}`,
                    data,
                    config
                );
                // alert("Updated successfully");
                toast.success("Data Updated successfully", { autoClose: 1500 });
            } else {
                await axios.post(
                    "http://localhost:5000/api/userinfo/createUserInfo",
                    data,
                    config
                );
                // alert("Saved successfully");
                toast.success("Data Saved successfully", { autoClose: 1500 });
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
        setForm({
            firstName: userData.firstName,
            lastName: userData.lastName,
        });
        setEditId(userData._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/userinfo/deleteUserInfo/${id}`,
                config
            );
            fetchUsers();
            toast.success("Data deleted successfully", { autoClose: 1500 });
        } catch (err) {
            console.error("DELETE ERROR:", err.response?.data || err.message);
            alert("Error deleting data");
        }
    };

    if (!hydrated || loading || fetching || !user) {
        return <p className="p-4">Loading...</p>;
    }

    const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("") : "U";

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-white shadow rounded p-6 h-fit">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-semibold">{initials}</div>
                        <div>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-sm mt-2">Role: <span className="font-medium">{user.role}</span></p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            dispatch(logout());
                            router.push("/auth/login");
                        }}
                        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold mb-4">Edit Contact Info</h3>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                className="border p-3 rounded flex-1"
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                className="border p-3 rounded flex-1"
                            />

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-3 bg-indigo-600 text-white rounded hover:bg-blue-700"
                            >
                                {editId ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded p-6">
                        <h3 className="text-lg font-semibold mb-4">Saved Entries</h3>

                        <div className="space-y-3">
                            {users.length ? (
                                users.map((userData) => (
                                    <div key={userData._id} className="flex items-center justify-between border rounded p-3">
                                        <div>
                                            <div className="font-medium">{userData.firstName} {userData.lastName}</div>
                                            <div className="text-sm text-gray-500">ID: {userData._id}</div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(userData)}
                                                className="px-3 py-1 bg-yellow-400 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(userData._id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 p-6">No data found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
