import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../store/admin/adminThunks";
import { updateUserRole } from "../store/admin/adminSlice";
import { logout } from "../store/auth/authSlice";

export default function AdminPanel() {
    const dispatch = useDispatch();

    const { users, loading } = useSelector((state) => state.admin);
    const { error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleRoleChange = (id, role) => {
        fetch(`http://localhost:5000/api/users/${id}/role`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ role }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) dispatch(updateUserRole({ id: data.user._id, role: data.user.role }));
            else alert(data.message || "Failed");
        })
        .catch(() => alert("Server error"));
    };

    const handleDeleteUser = (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        fetch(`http://localhost:5000/api/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("User deleted");
                dispatch(fetchAllUsers());
            } else {
                alert(data.message || "Failed to delete user");
            }
        })
        .catch(() => alert("Server error"));
    };

    return (
        <div className="container">
            <h2>Admin Panel</h2>
            <button onClick={() => dispatch(logout())}>Logout</button>

            {loading && <p>Loading users...</p>}
            {error && <p className="err">{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Change</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(u => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <select value={u.role} onChange={e => handleRoleChange(u._id, e.target.value)}>
                                    <option value="user">user</option>
                                    <option value="manager">manager</option>
                                    <option value="admin">admin</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteUser(u._id)} style={{ color: "red" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
