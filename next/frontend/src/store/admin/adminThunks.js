import { createAsyncThunk } from "@reduxjs/toolkit";
import { USERS } from "@/constants/api";

export const fetchAllUsers = createAsyncThunk(
    "admin/allUsers",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        const res = await fetch(USERS.ALL, {
            headers: { Authorization: "Bearer " + token }
        });
        const data = await res.json();
        if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Failed");
        return data.users;
    }
);

export const changeUserRole = createAsyncThunk(
    "admin/changeRole",
    async ({ id, role }, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");
        try {
            const res = await fetch(USERS.CHANGE_ROLE(id), {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify({ role })
            });
            const data = await res.json();
            if (!res.ok) throw data.message || "Failed";
            return data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async ({ id }, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");
        try {
            const res = await fetch(USERS.DELETE(id), {
                method: "DELETE",
                headers: { Authorization: "Bearer " + token }
            });
            const data = await res.json();
            if (!res.ok) throw data.message || "Failed";
            return { id };
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);