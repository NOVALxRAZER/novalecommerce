import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //User Login        
        loginStart:(state)=>{
            state.isFetching = true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        //Get Users
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Delete a User
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser.splice(
                state.currentUser.findIndex((item) => item._id === action.payload), 1
            );
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Add User Photo Profile to Firebase
        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser.push(...state.currentUser, action.payload);
        },
        addUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Update a User
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser[
                state.currentUser.findIndex((item) => item._id === action.payload._id && action.payload)]
            = action.payload.currentUser;
        },
        updateUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = userSlice.actions;
export default userSlice.reducer;