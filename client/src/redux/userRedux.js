import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Login State
        loginStart:(state) => {
            state.isFetching = true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;          
            state.error = false;
        },
        loginFailure:(state) => {
            state.isFetching = false;
            state.error = true;
        },
        //User Register
        registerStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        registerSuccess:(state,action) => {
            state.isFetching = false;
            state.currentUser.push(action.payload);
            state.error = false;
        
        },
        registerFailure:(state) => {
            state.isFetching = false;
            state.error = true;
        },
        //User Logout
        logout:(state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },
        //Update a User
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = {...state.currentUser, ...action.payload};
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
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;