import axios from "axios";

const BASE_URL = "http://localhost:8500/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjhlOGEwMWI3YjA0YjdkMzk3NGQ0ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODc4ODE1MiwiZXhwIjoxNjM5MjIwMTUyfQ.zyF3wy4xGnlaK-X_-xwyjvb5DOA25DTFaev2CuKMM8M"
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});