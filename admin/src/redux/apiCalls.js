import { publicRequest, userRequest } from "../requestMethods";
import { 
    loginFailure, 
    loginStart, 
    loginSuccess,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure } from "./userRedux"
import { 
    getProductStart, 
    getProductSuccess, 
    getProductFailure, 
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure } from "./productRedux";
import axios from "axios";

export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try {
        const res = await userRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await userRequest.get("/users")
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post(`/users`, user)
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
};

export const updateUser = async (currentUser, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put(`/users` + currentUser)
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        // const res = await userRequest.delete(`/users/${id}`)
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        // const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        // const res = await userRequest.put(`/products/${id}`)
        dispatch(updateProductSuccess({id, product}));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};