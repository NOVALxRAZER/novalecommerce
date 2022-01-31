import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        //Add Product(s)
        addProduct:(state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        //Delete a Product
        deleteProduct:(state, action) => {
            state.quantity -= 1;
            state.products = action.payload.cart;
            state.total = action.payload.totalCart;
        },
        //Delete all Products in Cart
        deleteCart:(state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        }
    }
});

export const { 
    addProduct,
    deleteCart, 
    deleteProduct 
} = cartSlice.actions;
export default cartSlice.reducer;