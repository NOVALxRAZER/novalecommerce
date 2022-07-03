import { userRequest } from "../requestMethods";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    loginGoogleSuccess,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from "./userRedux"
import {
    orderStart,
    orderSuccess,
    orderError,
    newOrderStart,
    newOrderSuccess,
    newOrderError,
    initialGetOrderUser,
} from "./orderRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await userRequest.post("/auth/login", user)
        if (res.status === 200) {
            dispatch(loginSuccess(res.data));
        } else {
            window.alert(res.statusText)
        }
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const loginGoogle = async (dispatch) => {
    const res = await userRequest.get("/login/success");
    console.log(res.data, "ini res data")
    dispatch(loginGoogleSuccess(res.data))
}

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await userRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
}

export const userLogout = (dispatch) => {
    dispatch(logout());
}

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${id}`, user, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        });
        console.log(updateUserSuccess(res.data), "ini ini")
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

export const getUserOrder = async (id, dispatch) => {
    dispatch(orderStart());
    try {
        const res = await userRequest.get(`/orders/find/${id}`, {
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        });
        dispatch(orderSuccess(res.data));
    } catch (err) {
        dispatch(orderError());
    }
}

export const stateGetUserOrder = async (dispatch) => {
    dispatch(initialGetOrderUser());
}

export const newUserOrder = async (dispatch, data) => {
    console.log("masuk")
    console.log(dispatch, "dispatch")
    dispatch(newOrderStart());
    console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken, "token")
    try {
        const res = await userRequest.post(`/orders`, data,{
            headers: {
                token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
            },
        });
        console.log(res, "ini respon");
        dispatch(newOrderSuccess(res.data));
    } catch (err) {
        console.log("ini error", err)
        dispatch(newOrderError());
    }
}