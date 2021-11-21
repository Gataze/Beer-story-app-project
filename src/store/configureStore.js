import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer';
import api from './middleware/api';
import authentication from './middleware/authentication'

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);


export default function storeConfiguration(){
    return configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }}).concat(api, authentication)
    })
}