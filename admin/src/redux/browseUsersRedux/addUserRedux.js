import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "addUsers",
    initialState: {
        addUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Add User
        addUserStart: (state) => {
            state.isFetching = true;
            state.addUser = null;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.addUser.push(...state.addUser, action.payload);
        },
        addUserFailure: (state) => {
            state.isFetching = false;
            state.addUser = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action Add User
        initialAddUser: (state) => {
            state.isFetching = false;
            state.addUser = null;
            state.error = false;
        },
    }
});

export const {
    addUserStart,
    addUserSuccess,
    addUserFailure,
    initialAddUser,
} = userSlice.actions;
export default userSlice.reducer;