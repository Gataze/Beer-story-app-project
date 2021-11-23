import { createSlice } from "@reduxjs/toolkit";
import { authCallBegan } from "./api";


// Slice for manipulating data received from firebase authentication.
const slice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: false,
        error: false,
    },
    reducers: {
        // Only this action sets loading as true in 'auth' slice. 
        userRequested: (auth, action) => {
            auth.loading = true;
        },
        userRegistered: (auth, action) => {
            auth.loading = false;
        },
        userRegisterFailed: (auth, action) => {
            auth.loading = false;
        },
        userLoginFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload;
        },
        userLogin: (auth, action) => {
            auth.loading = false;
            auth.error = false;
        },
        userLogout: (auth, action) => {
            auth.loading = false;
        },
        // If user logged in set auth.user as action.payload
        setUserLoggedIn: (auth, action) => {
            auth.user = action.payload;
            auth.loading = false;
            
        },
    }
})


export const  {
    userRequested,
    userRegisterFailed,
    userLoginFailed,
    userLogin,
    userLogout,
    setUserLoggedIn
} = slice.actions;

export default slice.reducer


// Function signUpUser calls authentication middleware (authCallBegan). It contains data needed to register new user.
export const signUpUser = (email, password, username) => authCallBegan({
    password: password,
    email: email,
    username: username,
    method: 'register',
    onStart: userRequested.type,
    onSuccess: setUserLoggedIn.type,
    onError: userRegisterFailed.type
})

// Function loginUser calls authentication middleware (authCallBegan). It contains data needed to sign-in.
export const loginUser = (email, password) => authCallBegan({
    email: email,
    password: password,
    method: 'login',
    onStart: userRequested.type,
    onSuccess: userLogin.type,
    onError: userLoginFailed.type
})

// Function logoutUser calls authentication middleware (authCallBegan). It contains data needed to log-out.
export const logoutUser = () => authCallBegan({
    method: 'logout',
    onStart: userRequested.type,
    onSuccess: userLogout.type,
    onError: userRegisterFailed.type
})
