import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "getProducts",
    initialState: {
        getProduct: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Add User
        getProductStart: (state) => {
            state.isFetching = true;
            state.getProduct = null;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.getProduct = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.getProduct = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action
        initialGetProduct: (state) => {
            state.isFetching = false;
            state.getProduct = null;
            state.error = false;
        }
    }
});

export const {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    initialGetProduct,
} = productSlice.actions;
export default productSlice.reducer;