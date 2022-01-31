import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "deleteUsers",
    initialState: {
        deleteUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Delete a User
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.deleteUser = null;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.deleteUser = action.payload;
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.deleteUser = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action Delete User
        initialDeleteUser: (state) => {
            state.isFetching = false;
            state.deleteUser = null;
            state.error = false;
        },
    }
});

export const {
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    initialDeleteUser,
} = userSlice.actions;
export default userSlice.reducer;