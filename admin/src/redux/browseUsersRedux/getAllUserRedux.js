import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "getAllUsers",
    initialState: {
        getUsers: [],
        isFetching: false,
        error: false
    },
    reducers: {
        //Get all Users
        getAllUserStart: (state) => {
            state.isFetching = true;
            state.getUsers = [];
            state.error = false;
        },
        getAllUserSuccess: (state, action) => {
            state.isFetching = false;
            state.getUsers = action.payload;
        },
        getAllUserFailure: (state) => {
            state.isFetching = false;
            state.getUsers = [];
            state.error = true;
        },
    }
});

export const {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailure,
} = userSlice.actions;
export default userSlice.reducer;