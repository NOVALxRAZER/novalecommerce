import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "addProducts",
    initialState: {
        addProduct: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Add New Product
        addProductStart: (state) => {
            state.isFetching = true;
            state.addProduct = null;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.addProduct.push(action.payload);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.addProduct = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action
        initialAddProduct: (state) => {
            state.isFetching = false;
            state.addProduct = null;
            state.error = false;
        },
    }
});

export const {
    addProductStart,
    addProductSuccess,
    addProductFailure,
    initialAddProduct,
} = productSlice.actions;
export default productSlice.reducer;