import { db } from "../../firebase/firebase.config";
import * as actions from '../api'
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc, limit, query, where } from 'firebase/firestore'


const api = ({dispatch}) => next => async action => {

    if(action.type !== actions.apiCallBegan.type) return next(action);

    const {data, method, onStart, onSuccess, onSuccessBeers, onSuccessComments, onSuccessRates, onError, numberOfDocs, group} = action.payload;
    
    
    if(onStart) dispatch({type: onStart});

    next(action);

    if(method === 'getDocs') try {
        const beersCollectionRef = query(collection(db, 'Beers'), limit(numberOfDocs), where("beerSection", "==", group))
        const data = await getDocs(beersCollectionRef)
        // const comments = await getDocs(commentsCollectionRef)

        if(onSuccess) dispatch({type: onSuccess, payload: data.docs.map(doc => ({...doc.data(), id: doc.id}))})
        // if(onSuccessComments) dispatch({type: onSuccessComments, payload: comments.docs.map(doc => ({...doc.data(), id: doc.id}))})
 
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
        if(onError) dispatch({type: onError, payload: error.message})
    }

    //pobiera z firebase pojedynczy dokument
    if(method === 'doc') try {

        const commentsCollectionRef =  query(collection(db, 'Comments'), where("articleId", "==", data))
        const ratesCollecionRef = query(collection(db, 'Rates'), where("articleID", "==", data))

        

        const beer = await getDoc(doc(db, 'Beers', data))
        
        const comments = await getDocs(commentsCollectionRef)
        //tu do zmianu
        const rates = await getDocs(ratesCollecionRef)


        if(onSuccessBeers) dispatch({type: onSuccessBeers, payload: [{...beer.data(), id: beer.id}]})
        if(onSuccessComments) dispatch({type: onSuccessComments, payload: comments.docs.map(doc => ({...doc.data(), id: doc.id}))})
        if(onSuccessRates) dispatch({type: onSuccessRates, payload: rates.docs.map(doc => ({...doc.data(), id: doc.id}))})
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }


    if(method === 'getUserDocs') try {

        
        const userCollecionRef = query(collection(db, 'Beers'), where("userID", "==", data))



        const userDocs = await getDocs(userCollecionRef);

        if(onSuccess) dispatch({type: onSuccess, payload: userDocs.docs.map(doc => ({...doc.data(), id: doc.id}))})
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }

    
    if(method === 'setDoc') try {

        console.log(data)

        await setDoc(doc(db, 'Beers', data.id), {
            name: data.name,
            author: data.author,
            photo: data.photo,
            description: data.description,
            beerSection: data.beerSection,
            references: data.references,
            date: data.date,
            userID: data.userID
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
        // if(onSuccess) dispatch({type: onSuccess, payload: {id: data}})
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

        const {gradeArrayItem, articleID, userID, id} = data;
        await setDoc(doc(db, 'Rates', id), {
            gradeArrayItem: gradeArrayItem,
            userID: userID,
            articleID: articleID
        })

        // await updateDoc(beerRef, {
            
        //     gradeArrayItem: gradeArrayItem
        // });
        dispatch(actions.apiCallSuccess(data));
        if(onSuccess) dispatch({type: onSuccess, payload: {gradeArrayItem: gradeArrayItem, userID: userID, articleID: articleID}});
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
    }




    if(method === 'clear'){
        dispatch({type: onSuccess})
    }


    if(method === 'loadComment') try {

        const commentsCollectionRef =  query(collection(db, 'Comments'), where("articleId", "==", data))

        const comments = await getDocs(commentsCollectionRef)

    
        if(onSuccess) dispatch({type: onSuccess, payload: comments.docs.map(doc => ({...doc.data(), id: doc.id}))})
    }
    catch(error){
        dispatch(actions.apiCallFailed(error.message))
}

    

   

    if(method === 'setComment') try {

        const {articleId, id, comment, date, user, userID} = data 


        await setDoc(doc(db, 'Comments', id), {
            
            id: id,
            articleId: articleId,
            user: user,
            userID: userID,
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