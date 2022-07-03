import { createSlice } from "@reduxjs/toolkit";

const editOrderSlice = createSlice({
    name: "editUserOrder",
    initialState: {
        editUserOrders: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Edit User Order
        editUserOrderStart: (state) => {
            state.isFetching = true;
            state.editUserOrders = null;
            state.error = false;
        },
        editUserOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.editUserOrders = action.payload;
        },
        editUserOrderError: (state) => {
            state.isFetching = false;
            state.editUserOrders = null;
            state.error = true;
        },
        initialEditOrderUser: (state) => {
            state.isFetching = false;
            state.editUserOrders = null;
            state.error = false;
        }
    }
});

export const {
    editUserOrderStart,
    editUserOrderSuccess,
    editUserOrderError,
    initialEditOrderUser,
} = editOrderSlice.actions;
export default editOrderSlice.reducer;