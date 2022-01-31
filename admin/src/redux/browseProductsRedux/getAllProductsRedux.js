import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "getAllProducts",
    initialState: {
        getAllProduct: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get All Product
        getAllProductsStart: (state) => {
            state.isFetching = true;
            state.getAllProduct = []
            state.error = false;
        },
        getAllProductsSuccess: (state, action) => {
            state.isFetching = false;
            state.getAllProduct = action.payload;
        },
        getAllProductsFailure: (state) => {
            state.isFetching = false;
            state.getAllProduct = []
            state.error = true;
        },
    }
})

export const {
    getAllProductsStart,
    getAllProductsSuccess,
    getAllProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;