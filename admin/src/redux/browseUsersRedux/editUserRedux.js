import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "editUsers",
    initialState: {
        editUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Update a User
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.editUser = null;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.editUser = action.payload;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.editUser = null;
        },
        //Kembali ke State awal setelah Action Edit User
        initialUpdateUser: (state) => {
            state.isFetching = false;
            state.editUser = null;
            state.error = false;
        },
    }
});

export const {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    initialUpdateUser,
} = userSlice.actions;
export default userSlice.reducer;