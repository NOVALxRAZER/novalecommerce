import axios from "axios";

const BASE_URL = "http://localhost:8500/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjhlOGEwMWI3YjA0YjdkMzk3NGQ0ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjUxNDYzNCwiZXhwIjoxNjM2OTQ2NjM0fQ.5KnJRQkAL6nts5MROE2fTMNonuN9PwmZNN3cNqyeka4"
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});