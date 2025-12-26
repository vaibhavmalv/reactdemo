import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./adminThunks";

const adminSlice = createSlice({
    name: "admin",
    initialState: { users: [], loading: false },
    reducers: {
        updateUserRole: (state, action) => {
            const { id, role } = action.payload;
            state.users = state.users.map(u =>
                u._id === id ? { ...u, role } : u
            );
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllUsers.pending, s => { s.loading = true; })
            .addCase(fetchAllUsers.fulfilled, (s, a) => {
                s.loading = false;
                s.users = a.payload;
            });
    }
});

export const { updateUserRole } = adminSlice.actions;
export default adminSlice.reducer;