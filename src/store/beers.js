import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';


// Slice for manipulating data received from firebase.
const slice = createSlice({
    name: 'beers',
    initialState: {
        loading: false,
        list: [],
        lastFetch: null,
        commentsList: [],
        rates: [],
    },
    reducers: {
        // Only this action sets loading as true in 'beers' slice.
        beersRequested: (beers, action) => {
            beers.loading = true;
        },

        // Save action payload to the data.
        beersReceived: (beers, action) => {
            beers.loading = false;
            beers.list = action.payload;
            beers.lastFetch = Date.now();
            
        },
        // This action is usually dispatched when we receive error from firebase.
        beersRequestFailed: (beers, action) => {
            beers.loading = false;
        },
        // Save action payload to the data.
        beerGetOne: (beers, action) => {
            beers.list = action.payload;
            beers.loading = false;
            beers.lastFetch = Date.now();
        },
        // Push action payload to the existing array of data in redux store.
        beerAdded: (beers, action) => {
            beers.list.push(action.payload)
            beers.loading = false;
        },
        // Find index of document with id that is equal to action.payload.id. Delete item with the same index in the array of documents. 
        beerDeleted: (beers, action) => {
            const index = beers.list.findIndex(beer => beer.id === action.payload.id);
            beers.list.splice(index, 1);
            beers.loading = false;
        },
        // Find index of document with id that is equal to action.payload.id. Overwrite item with this index in the array of documents.
        beerUpdated: (beers, action) => {
            const index = beers.list.findIndex(beer => beer.id === action.payload.id);
            beers.list[index].color = action.payload.color;
            beers.list[index].name = action.payload.name;
            beers.list[index].description = action.payload.description;
            beers.loading = false;
        },

        // Clear redux store, beers collection.
        beerClear: (beers, action) => {
            beers.list = []
            beers.loading = false
        },

        //Check if logged in user rated article before. If yes overwrite the rate value.
        beerRate: (beers, action) => {
            //Find index: If index is 0 or more user commented article. If index is -1 user never commented the article 
            const index = beers.rates.findIndex(beer => beer.userID === action.payload.userID)
            if(index >= 0){
                //If user rated the article, overwrite the old rate.
                beers.rates[index] = action.payload;
            }else{
                //If user never rated tha article, push new value to array of rates
                beers.rates.push(action.payload)
            }
            beers.loading = false
        },

        // Save action payload to the beers.rates.
        beerRateReceived: (beers, action) => {
            beers.loading = false;
            beers.rates = action.payload;
        },

        // Push new comment into commentsList array in redux store
        beerComment: (beers, action) => {
            beers.commentsList.push(action.payload)
            beers.loading = false
        },

        // Add action payload (all received comments) to empty commentsList array.
        beerCommentReceived: (beers, action) => {
            beers.loading = false;
            beers.commentsList = action.payload;
        },
        // Find index of comment with id that is equal to action.payload.id. Delete comment with this index in the array of documents. 
        beerCommentDeleted: (beers, action) => {
            const index = beers.commentsList.findIndex(comment => comment.id === action.payload.id);
            beers.commentsList.splice(index, 1);
            beers.loading = false;
        },
    }
})


const {
    beersRequested,
    beersReceived,
    beersRequestFailed,
    beerGetOne,
    beerAdded,
    beerDeleted,
    beerUpdated,
    beerRate,
    beerRateReceived,
    beerComment,
    beerCommentReceived,
    beerCommentDeleted,
    beerClear
} = slice.actions;

export default slice.reducer;


// Function loadBeers calls api middleware (apiCallBegan) if ignoreLastFetch is true or time between lastfetch and current time is more than 10 min.
// Method getDocs informs middleware what to do with received data.
export const loadBeers = (numberOfDocs, group ,ignoreLastFetch) => (dispatch, getState) => {
    
    if(!ignoreLastFetch) {
        const { lastFetch } = getState().entities.beers;
        const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
        if(diffInMinutes < 10) return;
    }
    


    dispatch(
        apiCallBegan({
            method: 'getDocs',
            numberOfDocs: numberOfDocs,
            group: group,
            onStart: beersRequested.type,
            onSuccess: beersReceived.type,
            onError: beersRequestFailed.type
        })
    )
}

// Function getOneBeer calls api middleware (apiCallBegan) if ignoreLastFetch is true or time between lastfetch and current time is more than 10 min.
// Method doc informs middleware what to do with received data.
export const getOneBeer = (id, ignoreLastFetch) => (dispatch, getState) => {
    if(!ignoreLastFetch) {
        const { lastFetch } = getState().entities.beers;
        const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
        if(diffInMinutes < 10) return;
    }


    dispatch(
        apiCallBegan({
            method: 'doc',
            data: id,
            onStart: beersRequested.type,
            onSuccessBeers: beerGetOne.type,
            onSuccessComments: beerCommentReceived.type,
            onSuccessRates: beerRateReceived.type,
            onError: beersRequestFailed.type
        })
    )
}


// Function getUserBeer calls api middleware (apiCallBegan) if ignoreLastFetch is true or time between lastfetch and current time is more than 10 min.
// Method 'getUserDoc' informs middleware what to do with received data.
export const getUserBeer = (user, ignoreLastFetch) => (dispatch, getState) => {

        if(!ignoreLastFetch){
        const { lastFetch } = getState().entities.beers;
        const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
        if(diffInMinutes < 10) return;
        }

        dispatch(
            apiCallBegan({
                method: 'getUserDocs',
                data: user,
                onStart: beersRequested.type,
                onSuccess: beersReceived.type,
                onError: beersRequestFailed.type
            })
        )
    
}


// Function addBeer calls api middleware (apiCallBegan).
// Method 'setDoc' informs middleware what to do with received data.
export const addBeer = (data) => apiCallBegan({
    method: 'setDoc',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerAdded.type,
    onError: beersRequestFailed.type
})


// Function deleteBeer calls api middleware (apiCallBegan).
// Method 'deleteDoc' informs middleware what to do with received data.
export const deleteBeer = (id) => apiCallBegan({
    method: 'deleteDoc',
    data: id,
    onStart: beersRequested.type,
    onSuccess: beerDeleted.type,
    onError: beersRequestFailed.type
})

// Function updateBeer calls api middleware (apiCallBegan).
// Method 'updateDoc' informs middleware what to do with received data.
export const updateBeer = (data) => apiCallBegan({
    method: 'updateDoc',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerUpdated.type,
    onError: beersRequestFailed.type
})

// Function loadCommentBeer calls api middleware (apiCallBegan).
// Method 'loadComment' informs middleware what to do with received data.
export const loadCommentBeer = (data) => apiCallBegan({
    method: 'loadComment',
    data: data,
    onStart: beersRequested.type,        
    onSuccess: beerCommentReceived.type,
    onError: beersRequestFailed.type

})

// Function commentBee calls api middleware (apiCallBegan).
// Method 'setComment' informs middleware what to do with received data.
export const commentBeer = (data) => apiCallBegan({
    method: 'setComment',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerComment.type,
    onError: beersRequestFailed.type
})


// Function 'clearBeer' calls api middleware (apiCallBegan).
// Method 'clear' informs middleware what to do with received data.
export const clearBeer = () => apiCallBegan({
    method: 'clear',
    onStart: beersRequested.type,
    onSuccess: beerClear.type,
    onError: beersRequestFailed.type
})

// Function 'rateBeer' calls api middleware (apiCallBegan).
// Method 'rateBeer' informs middleware what to do with received data.
export const rateBeer = (data) => apiCallBegan({
    method: 'rateBeer',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerRate.type,
    onError: beersRequestFailed.type
})


// Function 'deleteCommen' calls api middleware (apiCallBegan).
// Method 'deleteComment' informs middleware what to do with received data.
export const deleteComment = (id) => apiCallBegan({
    method: 'deleteComment',
    data: id,
    onStart: beersRequested.type,
    onSuccess: beerCommentDeleted.type,
    onError: beersRequestFailed.type
})


//This selector is used to select articles based on their id.
export const selectArticle = (id) => createSelector(
    state => state.entities.beers,
    beers => beers.list.filter(beer => beer.id === id)
    )

//This selector is used to select comments based on received articleId argument.
export const selectArticleComments = (articleId) => createSelector(
    state => state.entities.beers,
    beers => beers.commentsList.filter(comment => comment.articleId === articleId)
)

//This selector is used to select group of articles based on received articleGroup name (argument).
export const selectArticleGroups = (articleGroup) => createSelector(
    state => state.entities.beers,
    beers => beers.list.filter(beer => beer.beerSection === articleGroup)
)