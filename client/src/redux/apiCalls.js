import axios from "axios";
import { userRequest } from "../requestMethods";
import { 
    loginFailure,
    loginStart,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from "./userRedux"

export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try {
        const res = await userRequest.post("/auth/login", user)
        if(res.status === 200){
            dispatch(loginSuccess(res.data));
        }else{
            window.alert(res.statusText)
        }
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("http://localhost:8500/auth/register", user)
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