import { db } from "../../firebase/firebase.config";
import * as actions from '../api'
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc, limit, query, arrayUnion } from 'firebase/firestore'


const api = ({dispatch}) => next => async action => {

    if(action.type !== actions.apiCallBegan.type) return next(action);

    const {data, method, onStart, onSuccess, onSuccessBeers, onSuccessComments, onError, nDocs} = action.payload;
    const beersCollectionRef = query(collection(db, 'Beers'), limit(nDocs))
    const commentsCollectionRef =  collection(db, 'Comments')
    
    if(onStart) dispatch({type: onStart});

    next(action);

    if(method === 'getDocs') try {
    
        const data = await getDocs(beersCollectionRef)


        if(onSuccess) dispatch({type: onSuccess, payload: data.docs.map(doc => ({...doc.data(), id: doc.id}))})
 
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
        if(onError) dispatch({type: onError, payload: error.message})
    }

    //pobiera z firebase pojedynczy dokument
    if(method === 'doc') try {

        const beer = await getDoc(doc(db, 'Beers', data))
        const comments = await getDocs(commentsCollectionRef)

        if(onSuccessBeers) dispatch({type: onSuccessBeers, payload: [{...beer.data(), id: beer.id}]})
        if(onSuccessComments) dispatch({type: onSuccessComments, payload: comments.docs.map(doc => ({...doc.data(), id: doc.id}))})
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }

    
    if(method === 'setDoc') try {

        await setDoc(doc(db, 'Beers', data.id), {
            name: data.name,
            author: data.author,
            photo: data.photo,
            description: data.description,
            color: data.color,
            date: data.date,
            whoRated: data.whoRated
        })

        // dispatch(actions.apiCallSuccess(data))
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


    if(method === 'deleteComment') try {

        const comment = doc(db, "Comments", data)
        await deleteDoc(comment)

        dispatch(actions.apiCallSuccess('deleted'))
        if(onSuccess) dispatch({type: onSuccess, payload: {id: data}})
    }

    catch(error){
        dispatch(actions.apiCallFailed(error.message));
        if(onError) dispatch({type: onError, payload: error.message})
    }


    if(method === 'updateDoc') try {

        
        const {id, color, description, name, photo} = data 
        const beer = doc(db, 'Beers', id)
        console.log({id, color, description, name, photo})

        await updateDoc(beer, {id, description, name, color, photo});
        dispatch(actions.apiCallSuccess(data))
        if(onSuccess) dispatch({type: onSuccess, payload: data})
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }


    if(method === 'rateBeer') try {

        const {id, gradeArrayItem, whoRated} = data;
        const beerRef = doc(db, 'Beers', id)

        await updateDoc(beerRef, {
            
            whoRated: arrayUnion({name: whoRated, gradeArrayItem: gradeArrayItem})
        });
        dispatch(actions.apiCallSuccess(data));
        if(onSuccess) dispatch({type: onSuccess, payload: {id: id, name: whoRated, gradeArrayItem: gradeArrayItem}});
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }


    if(method === 'clear'){
        dispatch({type: onSuccess})
    }

    // if(method === 'addComment') try {

        
    //     const {id, comment, date, user} = data 
    //     const beer = doc(db, 'Beers', id)
    //     console.log({date, comment, user, id})

    //     await updateDoc(beer, {comments: arrayUnion({comment, date, user })});
    //     dispatch(actions.apiCallSuccess(data))
    //     if(onSuccess) dispatch({type: onSuccess, payload: {comment, date, user, id}})
    // }
    // catch(error){
    //     dispatch(actions.apiCallFailed(error.message))
    // }

    if(method === 'setComment') try {

        const {articleId, id, comment, date, user} = data 


        await setDoc(doc(db, 'Comments', id), {
            
            id: id,
            articleId: articleId,
            user: user,
            comment: comment,
            date: date
        })

        // dispatch(actions.apiCallSuccess(data))
        if(onSuccess) dispatch({type: onSuccess, payload: data})
    }
    catch(error){
        if(onError) dispatch({type: onError, payload: error.message})
        dispatch(actions.apiCallFailed(error.message))
    }




}

export default api