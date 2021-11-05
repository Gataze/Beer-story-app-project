import * as actions from "../api";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase.config';
import { loadBeers } from "../beers";

const authentication = ({dispatch}) => next => async action => {

    if(action.type !== actions.authCallBegan.type) return next(action)

    const {email, password, method, onStart, onSuccess, onError} = action.payload
    
    if(onStart) dispatch({ type: onStart });
   

    next(action);

    if(method === 'register'){
        try{
            const user = await createUserWithEmailAndPassword(
                auth, 
                email, 
                password 
            )
            
            if(onSuccess) dispatch({type: onSuccess, payload: user})
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

            dispatch(loadBeers())
            if(onSuccess) dispatch({type: onSuccess})
            
        } catch( error ){
            console.log(error.message);
        }
    }
    if(method === 'logout'){
        try{
            await signOut(auth);
            
        }

        
        catch( error ){
            console.log(error.message);
        }
    }
}

export default authentication