import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE, USERINFO, USERS, CONTACT } from "@/constants/api";

export const fetchUserProfile = createAsyncThunk(
    "user/profile",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            const res = await fetch(USERS.ME, {
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

export const fetchUserInfo = createAsyncThunk(
    "user/userinfo/get",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            const res = await fetch(USERINFO.GET, {
                headers: { Authorization: "Bearer " + token }
            });
            const data = await res.json();
            if (!res.ok) throw data.error || data.message || "Failed";
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const createUserInfo = createAsyncThunk(
    "user/userinfo/create",
    async (payload, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            const res = await fetch(USERINFO.CREATE, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw data.error || data.message || "Failed";
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    "user/userinfo/update",
    async (payload, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            const res = await fetch(USERINFO.UPDATE, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw data.error || data.message || "Failed";
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

// CONTACT THUNKS
export const fetchContact = createAsyncThunk(
    "user/contact/get",
    async (_, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");

        try {
            const res = await fetch(CONTACT.GET, { headers: { Authorization: "Bearer " + token } });
            const data = await res.json();
            if (!res.ok) throw data.error || data.message || "Failed";
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const createContact = createAsyncThunk(
    "user/contact/create",
    async (payload, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");
        try {
            const res = await fetch(CONTACT.CREATE, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw data.error || data.message || "Failed";
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateContact = createAsyncThunk(
    "user/contact/update",
    async (payload, thunkAPI) => {
        const token = localStorage.getItem("token");
        if (!token) return thunkAPI.rejectWithValue("No token");
        try {
            const res = await fetch(CONTACT.UPDATE, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw data.error || data.message || "Failed";
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);
