import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw data.message;
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// if you have signup
export const signupUser = createAsyncThunk(
    "auth/signup",
    async (payload, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw data.message;
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);
