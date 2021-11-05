import { db } from "../../firebase/firebase.config";
import * as actions from '../api'
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, limit, query } from 'firebase/firestore'


const api = ({dispatch}) => next => async action => {

    if(action.type !== actions.apiCallBegan.type) return next(action);

    const {data, method, onStart, onSuccess, onError, nDocs} = action.payload;
    const beersCollectionRef = query(collection(db, 'Beers'), limit(nDocs))

    
    if(onStart) dispatch({type: onStart});

    next(action);

    if(method === 'getDocs') try {
    
        const data = await getDocs(beersCollectionRef)
        const serializedData = data.docs.map(doc => ({...doc.data(), id: doc.id}))
        

        dispatch(actions.apiCallSuccess(serializedData))


        if(onSuccess) dispatch({type: onSuccess, payload: data.docs.map(doc => ({...doc.data(), id: doc.id}))})


        
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
        if(onError) dispatch({type: onError, payload: error.message})
    }

    
    if(method === 'setDoc') try {

        await setDoc(doc(db, 'Beers', data.id), {
            name: data.name,
            description: data.description,
            color: data.color,
            date: data.date
        })

        dispatch(actions.apiCallSuccess(data))
        if(onSuccess) dispatch({type: onSuccess, payload: data})
    }
    catch(error){
        if(onError) dispatch({type: onError, payload: error.message})
        dispatch(actions.apiCallFailed(error.message))
    }

    if(method === 'deleteDoc') try {

        const beer = doc(db, "Beers", data)
        await deleteDoc(beer)

        dispatch(actions.apiCallSuccess('deleted'))
        if(onSuccess) dispatch({type: onSuccess, payload: {id: data}})
    }



    catch(error){
        dispatch(actions.apiCallFailed(error.message));
        if(onError) dispatch({type: onError, payload: error.message})
    }


    if(method === 'updateDoc') try {

        
        const {id, color, description, name} = data 
        const beer = doc(db, 'Beers', id)
        console.log({id, color, description, name})

        await updateDoc(beer, {id, description, name, color});
        dispatch(actions.apiCallSuccess(data))
        if(onSuccess) dispatch({type: onSuccess, payload: data})
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }

    if(method === 'clear'){
        dispatch({type: onSuccess})
    }




}

export default api