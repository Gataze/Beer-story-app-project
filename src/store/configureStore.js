import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';
import api from './middleware/api';
import authentication from './middleware/authentication'

export default function storeConfiguration(){
    return configureStore({
        reducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api, authentication)
    })
}