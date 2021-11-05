import { createSlice } from "@reduxjs/toolkit";
import { authCallBegan } from "./api";



const slice = createSlice({
    name: 'auth',
    initialState: {
        loading: false
    },
    reducers: {
        userRegisterRequested: (auth, action) => {
            auth.loading = true;
        },
        userRegistered: (auth, action) => {
            auth.loading = false
        },
        userRegisterFailed: (auth, action) => {
            auth.loading = false
        },
        userLogin: (auth, action) => {
            auth.loading = false
        },
        userLogout: (auth, action) => {
            auth.loading = false
        }
    }
})


const {
    userRegisterRequested,
    userRegistered,
    userRegisterFailed,
    userLogin,
    userLogout
} = slice.actions;

export default slice.reducer

export const signUpUser = (email, password) => authCallBegan({
    password: password,
    email: email,
    method: 'register',
    onStart: userRegisterRequested.type,
    onSuccess: userRegistered.type,
    onError: userRegisterFailed.type
})

export const loginUser = (email, password) => authCallBegan({
    email: email,
    password: password,
    method: 'login',
    onStart: userRegisterRequested.type,
    onSuccess: userLogin.type,
    onError: userRegisterFailed.type
})

export const logoutUser = () => authCallBegan({
    method: 'logout',
    onStart: userRegisterRequested.type,
    onSuccess: userLogout.type,
    onError: userRegisterFailed.type
})
