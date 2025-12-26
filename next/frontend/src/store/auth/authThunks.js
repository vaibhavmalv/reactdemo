import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH } from "@/constants/api";

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const res = await fetch(AUTH.LOGIN, {
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

// signup
export const signupUser = createAsyncThunk(
    "auth/signup",
    async (payload, thunkAPI) => {
        try {
            const res = await fetch(AUTH.REGISTER, {
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

export const requestPasswordReset = createAsyncThunk(
    'auth/requestPasswordReset',
    async ({ email }, thunkAPI) => {
        try {
            const res = await fetch(AUTH.PASSWORD_RESET_REQUEST, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw data.message || 'Error';
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, thunkAPI) => {
        try {
            const url = AUTH.PASSWORD_RESET_CONFIRM(token);
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();
            if (!res.ok) throw data.message || 'Error';
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);
