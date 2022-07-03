import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "getAllOrder",
    initialState: {
        getAllOrders: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Add New Product
        getAllOrderStart: (state) => {
            state.isFetching = true;
            state.getAllOrders = null;
            state.error = false;
        },
        getAllOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.getAllOrders = action.payload;
        },
        getAllOrderError: (state) => {
            state.isFetching = false;
            state.getAllOrders = null;
            state.error = true;
        },
        initialGetOrderUser: (state) => {
            state.isFetching = false;
            state.getAllOrders = null;
            state.error = false;
        }
    }
});

export const {
    getAllOrderStart,
    getAllOrderSuccess,
    getAllOrderError,
    initialGetOrderUser,
} = orderSlice.actions;
export default orderSlice.reducer;