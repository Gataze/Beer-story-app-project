import * as actions from "../api";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, sendEmailVerification } from 'firebase/auth'
import { auth } from '../../firebase/firebase.config';
import { loadBeers } from "../beers";

const authentication = ({dispatch}) => next => async action => {

    if(action.type !== actions.authCallBegan.type) return next(action)

    const {email, password, username ,method, onStart, onSuccess, onError} = action.payload
    
    if(onStart) dispatch({ type: onStart });
   

    next(action);

    if(method === 'register'){
        try{
            await createUserWithEmailAndPassword(
                auth, 
                email,
                password
                
            )
            const userDate = await updateProfile(auth.currentUser, {
                displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"})

            await sendEmailVerification(auth.currentUser)


            
            if(onSuccess) dispatch({type: onSuccess, payload: {email, username}})

            console.log(userDate)
        }  
        catch( error ){
            if(onError) dispatch({type: onError, payload: error.message}) 
        }
    }
    if(method === 'login'){
        try{
            await signInWithEmailAndPassword(
                auth, 
                email, 
                password 
            );

            dispatch(loadBeers(3))
            if(onSuccess) dispatch({type: onSuccess})
            
        } catch( error ){
            console.log(error.message);
        }
    }
    if(method === 'logout'){
        try{
            await signOut(auth);

            if(onSuccess) dispatch({type: onSuccess})
            
        }

        

        
        catch( error ){
            console.log(error.message);
        }
    }
}

export default authentication