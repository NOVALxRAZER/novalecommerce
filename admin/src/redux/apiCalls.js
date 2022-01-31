import { userRequest } from "../requestMethods";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
} from "./userRedux"
import {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailure,
} from "./browseUsersRedux/getAllUserRedux"
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    initialUpdateUser,
} from "./browseUsersRedux/editUserRedux"
import {
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    initialDeleteUser,
} from "./browseUsersRedux/deleteUserRedux"
import {
    addUserStart,
    addUserSuccess,
    addUserFailure,
    initialAddUser,
} from "./browseUsersRedux/addUserRedux"
import {
    getUserStart,
    getUserSuccess,
    getUserFailure,
    initialGetUser,
} from "./browseUsersRedux/getUserRedux"
import {
    getAllProductsStart,
    getAllProductsSuccess,
    getAllProductsFailure,
} from "./browseProductsRedux/getAllProductsRedux"
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    initialGetProduct,
} from "./browseProductsRedux/getProductRedux"
import {
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    initialDeleteProduct,
} from "./browseProductsRedux/deleteProductRedux"
import {
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    initialEditProduct,
} from "./browseProductsRedux/editProductRedux"
import {
    addProductStart,
    addProductSuccess,
    addProductFailure,
    initialAddProduct,
} from "./browseProductsRedux/addProductRedux";

//----------------------------Login Logout User----------------------------//
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await userRequest.post("/auth/login", user)
        console.log(res, "ini res login")
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const userLogout = (dispatch) => {
    dispatch(logout());
}

//----------------------------Get a User----------------------------//
export const getUser = async (id, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await userRequest.get(`/users/find/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
}

export const stateGetUser = (dispatch) => {
    dispatch(initialGetUser());
}

//----------------------------Get All Users----------------------------//
export const getAllUsers = async (dispatch) => {
    dispatch(getAllUserStart());
    try {
        const res = await userRequest.get("/users", {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(getAllUserSuccess(res.data));
    } catch (err) {
        dispatch(getAllUserFailure());
    }
};

//----------------------------Add User----------------------------//
export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post(`/users`, user, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
};

export const stateAddUser = (dispatch) => {
    dispatch(initialAddUser());
}

//----------------------------Update or Edit a User----------------------------//
export const updateUser = async (id, user, dispatch) => {
    // console.log(id, user,"++++++++++++++++++++", JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,)
    // return (dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${id}`, user, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        // console.log(res.data, "ini res data")
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
    // }
};

export const stateUpdateUser = (dispatch) => {
    dispatch(initialUpdateUser());
}

//----------------------------Delete a User----------------------------//
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await userRequest.delete(`/users/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

export const stateDeleteUser = (dispatch) => {
    dispatch(initialDeleteUser());
}

//----------------------------Get all Products----------------------------//
export const getAllProducts = async (dispatch) => {
    dispatch(getAllProductsStart());
    try {
        const res = await userRequest.get("/products", {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(getAllProductsSuccess(res.data));
    } catch (err) {
        dispatch(getAllProductsFailure());
    }
};

//---------------------------Get a Product----------------------------//
export const getProduct = async (id, dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await userRequest.get(`/products/find/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const stateGetProduct = async (dispatch) => {
    dispatch(initialGetProduct());
}

//----------------------------Delete a Product----------------------------//
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(deleteProductSuccess(res.data));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const stateDeleteProduct = async (dispatch) => {
    dispatch(initialDeleteProduct());
}

//----------------------------Update or Edit Product --------------------------------//
export const updateProduct = (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = userRequest.put(`/products/${id}`, product, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(updateProductSuccess(res.data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const stateEditProduct = async (dispatch) => {
    dispatch(initialEditProduct());
}

//----------------------------Add a Product----------------------------//
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, product, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        })
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};

export const stateAddProduct = async (dispatch) => {
    dispatch(initialAddProduct());
}