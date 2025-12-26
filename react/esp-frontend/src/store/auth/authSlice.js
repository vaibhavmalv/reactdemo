import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./authThunks";

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            localStorage.clear();
        },
        setUserFromStorage: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, s => { s.loading = true; })
            .addCase(loginUser.fulfilled, (s, a) => {
                s.loading = false;
                s.user = a.payload.user;
                s.token = a.payload.token;
                s.role = a.payload.user.role;
                localStorage.setItem("token", a.payload.token);
                localStorage.setItem("role", a.payload.user.role);
                localStorage.setItem("user", JSON.stringify(a.payload.user));
            })
            .addCase(loginUser.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })
            .addCase(signupUser.pending, s => { s.loading = true; })
            .addCase(signupUser.fulfilled, (s, a) => {
                s.loading = false;
                s.user = a.payload.user;
                s.token = a.payload.token;
            })
            .addCase(signupUser.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            });
    }
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
