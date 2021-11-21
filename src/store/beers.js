import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

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
        beersRequested: (beers, action) => {
            beers.loading = true;
        },
        beersReceived: (beers, action) => {
            beers.loading = false;
            beers.list = action.payload;
            beers.lastFetch = Date.now();
            
        },
        beersRequestFailed: (beers, action) => {
            beers.loading = false;
        },
        beerGetOne: (beers, action) => {
            beers.list = action.payload;
            beers.loading = false;
            beers.lastFetch = Date.now();
        },
        beerAdded: (beers, action) => {
            beers.loading = false;
        },
        beerDeleted: (beers, action) => {
            const index = beers.list.findIndex(beer => beer.id === action.payload.id);
            beers.list.splice(index, 1);
            beers.loading = false;
        },
        beerUpdated: (beers, action) => {
            const index = beers.list.findIndex(beer => beer.id === action.payload.id);
            beers.list[index].color = action.payload.color;
            beers.list[index].name = action.payload.name;
            beers.list[index].description = action.payload.description;
            beers.loading = false;
        },
        beerClear: (beers, action) => {
            beers.list = []
            beers.loading = false
        },
        beerRate: (beers, action) => {
            //Check if logged in user rated article before. If yes overwrite the rate value.
            //Find index: If index is 0 or more user commented article. If index is -1 user never commented the article 
            const index = beers.rates.findIndex(beer => beer.userID === action.payload.userID)
            if(index >= 0){
                //If user rated the article, overwrite the old rate.
                beers.rates[index] = action.payload;
            }else{
                //If user never rated tha article for the first time, push new value to array of rates
                beers.rates.push(action.payload)
            }
            beers.loading = false
        },
        beerRateReceived: (beers, action) => {
            beers.loading = false;
            beers.rates = action.payload;
        },
        beerComment: (beers, action) => {
            beers.commentsList.push(action.payload)
            beers.loading = false
        },
        beerCommentReceived: (beers, action) => {
            beers.loading = false;
            beers.commentsList = action.payload;
        },
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



export const addBeer = (data) => apiCallBegan({
    method: 'setDoc',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerAdded.type,
    onError: beersRequestFailed.type
})

export const deleteBeer = (id) => apiCallBegan({
    method: 'deleteDoc',
    data: id,
    onStart: beersRequested.type,
    onSuccess: beerDeleted.type,
    onError: beersRequestFailed.type
})


export const updateBeer = (data) => apiCallBegan({
    method: 'updateDoc',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerUpdated.type,
    onError: beersRequestFailed.type
})



export const loadCommentBeer = (data) => apiCallBegan({
    method: 'loadComment',
    data: data,
    onStart: beersRequested.type,        
    onSuccess: beerCommentReceived.type,
    onError: beersRequestFailed.type

})


export const commentBeer = (data) => apiCallBegan({
    method: 'setComment',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerComment.type,
    onError: beersRequestFailed.type
})


export const clearBeer = () => apiCallBegan({
    method: 'clear',
    onStart: beersRequested.type,
    onSuccess: beerClear.type,
    onError: beersRequestFailed.type
})


export const rateBeer = (data) => apiCallBegan({
    method: 'rateBeer',
    data: data,
    onStart: beersRequested.type,
    onSuccess: beerRate.type,
    onError: beersRequestFailed.type
})



export const deleteComment = (id) => apiCallBegan({
    method: 'deleteComment',
    data: id,
    onStart: beersRequested.type,
    onSuccess: beerCommentDeleted.type,
    onError: beersRequestFailed.type
})



export const selectArticle = (id) => createSelector(
    state => state.entities.beers,
    beers => beers.list.filter(beer => beer.id === id)
    )

export const selectArticleComments = (articleId) => createSelector(
    state => state.entities.beers,
    beers => beers.commentsList.filter(comment => comment.articleId === articleId)
)

export const selectArticleGroups = (articleGroup) => createSelector(
    state => state.entities.beers,
    beers => beers.list.filter(beer => beer.beerSection === articleGroup)
)