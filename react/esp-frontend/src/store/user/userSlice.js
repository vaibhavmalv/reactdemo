import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./userThunks";

const userSlice = createSlice({
    name: "user",
    initialState: { profile: null, loading: false },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserProfile.pending, s => { s.loading = true; })
            .addCase(fetchUserProfile.fulfilled, (s, a) => {
                s.loading = false;
                s.profile = a.payload;
            })
            .addCase(fetchUserProfile.rejected, s => { s.loading = false; });
    }
});

export default userSlice.reducer;
