import { createSlice, createSelector } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
    name: 'beers',
    initialState: {
        loading: false,
        list: [],
        lastFetch: null
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
            beers.list.push(action.payload);
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
        }
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
    
} = slice.actions;

export default slice.reducer;


export const loadBeers = (numberOfDocs, ignoreLastFetch) => (dispatch, getState) => {
    
    if(!ignoreLastFetch) {
        const { lastFetch } = getState().entities.beers;
        const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
        if(diffInMinutes < 10) return;
    }
    


    dispatch(
        apiCallBegan({
            method: 'getDocs',
            nDocs: numberOfDocs,
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
            onSuccess: beerGetOne.type,
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


// export const clearBeer = () => apiCallBegan({
//     method: 'clear',
//     onStart: beersRequested.type,
//     onSuccess: beerClear.type,
//     onError: beersRequestFailed.type
// })



export const selectArticle = (id) => createSelector(
    state => state.entities.beers,
    beers => beers.list.filter(beer => beer.id === id)
    
    )

