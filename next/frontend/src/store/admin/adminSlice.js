import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, changeUserRole, deleteUser } from "./adminThunks";

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
            })
            .addCase(changeUserRole.fulfilled, (s, a) => {
                const u = a.payload;
                s.users = s.users.map(x => x._id === u._id ? u : x);
            })
            .addCase(deleteUser.fulfilled, (s, a) => {
                s.users = s.users.filter(u => u._id !== a.payload.id);
            });
    }
});

export const { updateUserRole } = adminSlice.actions;
export default adminSlice.reducer;