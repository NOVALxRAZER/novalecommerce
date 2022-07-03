import { createSlice } from "@reduxjs/toolkit";

const getOrderSlice = createSlice({
    name: "getOrder",
    initialState: {
        orders: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get User Order
        orderStart:(state) => {
            state.isFetching = true;
        },
        orderSuccess:(state,action) => {
            state.isFetching = false;
            state.orders = action.payload;
            state.error = false;
        },
        orderError:(state) => {
            state.isFetching = false;
            state.error = true;
        },
        //New User Order
        newOrderStart:(state) => {
            state.isFetching = true;
        },
        newOrderSuccess:(state,action) => {
            state.isFetching = false;
            state.orders = action.payload;
            state.error = false;
        },
        newOrderError:(state) => {
            state.isFetching = false;
            state.error = true;
        },
        initialGetOrderUser: (state) => {
            state.isFetching = false;
            state.orders = null;
            state.error = false;
        },
    }
})

export const {
    orderStart,
    orderSuccess,
    orderError,
    newOrderStart,
    newOrderSuccess,
    newOrderError,
    initialGetOrderUser,
} = getOrderSlice.actions;
export default getOrderSlice.reducer;