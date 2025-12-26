import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
    "user/profile",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            const res = await fetch("http://localhost:5000/api/users/me", {
                headers: { Authorization: "Bearer " + token }
            });

            const data = await res.json();
            if (!res.ok) throw data.message;
            return data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);
