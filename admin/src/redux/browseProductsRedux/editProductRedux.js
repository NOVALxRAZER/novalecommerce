import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "editProduct",
    initialState: {
        editProduct: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        //Update a Product
        updateProductStart: (state) => {
            state.isFetching = true;
            state.editProduct = null;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.editProduct = action.payload;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.editProduct = null;
            state.error = true;
        },
        //Kembali ke State awal setelah Action
        initialEditProduct: (state) => {
            state.isFetching = false;
            state.editProduct = null;
            state.error = false;
        }
    }
})

export const {
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    initialEditProduct,
} = productSlice.actions;

export default productSlice.reducer;