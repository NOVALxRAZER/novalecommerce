import axios from "axios";
import { publicRequest } from "../requestMethods";
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
        const res = await publicRequest.post("/auth/login", user)
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

export const updateUser = (id, user) => {
    return (dispatch) => {
        dispatch(updateUserStart());
        try {
            const res = publicRequest.put(`/users/${id}`, user)
            // console.log(res.data, "ini res data")
            dispatch(updateUserSuccess(res.data));
        } catch (err) {
            dispatch(updateUserFailure());
        }
    }
};