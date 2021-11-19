import { createSlice } from "@reduxjs/toolkit";



const slice = createSlice({
    name: 'styles',
    initialState: {
        loginShow: false,
        signUpShow: false,
        loggedIn: {},
        edit: false,
        ageConfirmed: true,
        emailVerificationMessage: false
    },
    reducers: {
        setLoginFormValue: (styles, action) => {
            styles.loginShow = !styles.loginShow
        },
        handleSignUpStyle: (styles, action) => {
            styles.signUpShow = !styles.signUpShow
        },
        setUserLoggedIn: (styles, action) => {
            styles.loggedIn = action.payload? action.payload : null
        },
        setEditMode: (styles, action) => {
            styles.edit = action.payload
        },
        setUserAgeVerified: (styles, action) => {
            styles.ageConfirmed = action.payload
        },
        setEmailVerificationMessage: (styles, action) => {
            styles.emailVerificationMessage = action.payload
        }

    }
})

export const {
    setLoginFormValue,
    handleSignUpStyle,
    setUserLoggedIn,
    setEditMode,
    setUserAgeVerified,
    setEmailVerificationMessage
} = slice.actions

export default slice.reducer

