import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "deleteProducts",
    initialState: {
        deleteProduct: null,
        isFetching: false,
        error: false
    },
    reducers: {
        //Delete a Product
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.deleteProduct = null;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.deleteProduct = action.payload;
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.deleteProduct = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action
        initialDeleteProduct: (state) => {
            state.isFetching = false;
            state.deleteProduct = null;
            state.error = false;
        }
    }
});

export const {
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    initialDeleteProduct,
} = productSlice.actions;
export default productSlice.reducer;