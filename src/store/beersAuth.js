import { createSlice } from "@reduxjs/toolkit";
import { authCallBegan } from "./api";



const slice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        loggedIn: false
    },
    reducers: {
        userRequested: (auth, action) => {
            auth.loading = true;
        },
        userRegistered: (auth, action) => {
            auth.loading = false
            auth.loggedIn = true
        },
        userRegisterFailed: (auth, action) => {
            auth.loading = false
        },
        userLogin: (auth, action) => {
            auth.loading = false
            auth.loggedIn = true
        },
        userLogout: (auth, action) => {
            auth.loading = false
            auth.loggedIn = false
        }
    }
})


const {
    userRequested,
    userRegistered,
    userRegisterFailed,
    userLogin,
    userLogout
} = slice.actions;

export default slice.reducer

export const signUpUser = (email, password, username) => authCallBegan({
    password: password,
    email: email,
    username: username,
    method: 'register',
    onStart: userRequested.type,
    onSuccess: userRegistered.type,
    onError: userRegisterFailed.type
})

export const loginUser = (email, password) => authCallBegan({
    email: email,
    password: password,
    method: 'login',
    onStart: userRequested.type,
    onSuccess: userLogin.type,
    onError: userRegisterFailed.type
})

export const logoutUser = () => authCallBegan({
    method: 'logout',
    onStart: userRequested.type,
    onSuccess: userLogout.type,
    onError: userRegisterFailed.type
})
