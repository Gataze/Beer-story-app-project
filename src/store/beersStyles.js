import { createSlice } from "@reduxjs/toolkit";


// Styles data manipulation slice
const slice = createSlice({
    name: 'styles',
    initialState: {
        loginShow: false,
        signUpShow: false,
        loggedIn: {},
        edit: false,
        ageConfirmed: true,
        emailVerificationMessage: false,
        passwordForgot: false
    },
    reducers: {
        setLoginFormValue: (styles, action) => {
            styles.loginShow = action.payload;
        },
        handleSignUpStyle: (styles, action) => {
            styles.signUpShow = !styles.signUpShow;
        },
        setUserLoggedIn: (styles, action) => {
            styles.loggedIn = action.payload? action.payload : null;
        },
        setEditMode: (styles, action) => {
            styles.edit = action.payload;
        },
        setUserAgeVerified: (styles, action) => {
            styles.ageConfirmed = action.payload;
        },
        setEmailVerificationMessage: (styles, action) => {
            styles.emailVerificationMessage = action.payload;
        },
        setPasswordForgotForm: (styles, action) => {
            styles.passwordForgot = action.payload;
        }

    }
})

export const {
    setLoginFormValue,
    handleSignUpStyle,
    setUserLoggedIn,
    setEditMode,
    setUserAgeVerified,
    setEmailVerificationMessage,
    setPasswordForgotForm
} = slice.actions

export default slice.reducer

