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
        loginStart:(state)=>{
            // console.log('start')
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            // console.log(state, "? ",action,'ini login')
            state.isFetching = false;
            state.currentUser = action.payload   ;          
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        //User Register
        registerStart:(state)=>{
            state.isFetching = true;
            state.error=false;
        },
        registerSuccess:(state,action)=>{
            state.isFetching = false;
            state.currentUser.push(action.payload);
            state.error = false;
        
        },
        registerFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        //User Logout
        logout:(state)=>{
            state.currentUser=null;
            state.isFetching=false;
            state.error=false;
        }
    }
});

export const { 
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout
} = userSlice.actions;
export default userSlice.reducer;