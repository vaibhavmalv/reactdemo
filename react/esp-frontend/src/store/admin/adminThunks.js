import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
    "admin/allUsers",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        const res = await fetch("http://localhost:5000/api/users", {
            headers: { Authorization: "Bearer " + token }
        });
        const data = await res.json();
       
        return data.users;
       
    }
);