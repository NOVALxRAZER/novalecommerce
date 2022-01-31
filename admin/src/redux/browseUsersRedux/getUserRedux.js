import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "getUsers",
    initialState: {
        getUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Add User
        getUserStart: (state) => {
            state.isFetching = true;
            state.getUser = null;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.getUser = action.payload;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.getUser = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action
        initialGetUser: (state) => {
            state.isFetching = false;
            state.getUser = null;
            state.error = false;
        }
    }
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    initialGetUser,
} = userSlice.actions;
export default userSlice.reducer;