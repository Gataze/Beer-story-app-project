import { createSlice } from "@reduxjs/toolkit";
import { authCallBegan } from "./api";



const slice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        
        user: false
    },
    reducers: {
        userRequested: (auth, action) => {
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
           
        },
        setUserLoggedIn: (auth, action) => {
            auth.user = action.payload;
            auth.loading = false;
            
        },
    }
})


export const  {
    userRequested,
    userRegisterFailed,
    userLogin,
    userLogout,
    setUserLoggedIn
} = slice.actions;

export default slice.reducer

export const signUpUser = (email, password, username) => authCallBegan({
    password: password,
    email: email,
    username: username,
    method: 'register',
    onStart: userRequested.type,
    onSuccess: setUserLoggedIn.type,
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
