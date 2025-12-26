import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, fetchUserInfo, createUserInfo, updateUserInfo, fetchContact, createContact, updateContact } from "./userThunks";

const userSlice = createSlice({
    name: "user",
    initialState: { account: null, accountLoading: false, userinfo: null, userinfoLoading: false, contact: null, contactLoading: false },
    reducers: {},
    extraReducers: builder => {
        builder
            // account (auth/user)
            .addCase(fetchUserProfile.pending, s => { s.accountLoading = true; })
            .addCase(fetchUserProfile.fulfilled, (s, a) => {
                s.accountLoading = false;
                s.account = a.payload;
            })
            .addCase(fetchUserProfile.rejected, s => { s.accountLoading = false; })

            // userinfo
            .addCase(fetchUserInfo.pending, s => { s.userinfoLoading = true; })
            .addCase(fetchUserInfo.fulfilled, (s, a) => {
                s.userinfoLoading = false;
                s.userinfo = a.payload;
            })
            .addCase(fetchUserInfo.rejected, s => { s.userinfoLoading = false; })

            .addCase(createUserInfo.pending, s => { s.userinfoLoading = true; })
            .addCase(createUserInfo.fulfilled, (s, a) => {
                s.userinfoLoading = false;
                s.userinfo = a.payload;
            })
            .addCase(createUserInfo.rejected, s => { s.userinfoLoading = false; })

            .addCase(updateUserInfo.pending, s => { s.userinfoLoading = true; })
            .addCase(updateUserInfo.fulfilled, (s, a) => {
                s.userinfoLoading = false;
                s.userinfo = a.payload;
            })
            .addCase(updateUserInfo.rejected, s => { s.userinfoLoading = false; })

            // contact
            .addCase(fetchContact.pending, s => { s.contactLoading = true; })
            .addCase(fetchContact.fulfilled, (s, a) => {
                s.contactLoading = false;
                s.contact = a.payload;
            })
            .addCase(fetchContact.rejected, s => { s.contactLoading = false; })

            .addCase(createContact.pending, s => { s.contactLoading = true; })
            .addCase(createContact.fulfilled, (s, a) => {
                s.contactLoading = false;
                s.contact = a.payload;
            })
            .addCase(createContact.rejected, s => { s.contactLoading = false; })

            .addCase(updateContact.pending, s => { s.contactLoading = true; })
            .addCase(updateContact.fulfilled, (s, a) => {
                s.contactLoading = false;
                s.contact = a.payload;
            })
            .addCase(updateContact.rejected, s => { s.contactLoading = false; });
    }
});

export default userSlice.reducer;
