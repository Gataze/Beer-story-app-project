import { combineReducers } from "redux";
import beersReducer from './beers';
import beersAuthReducer from './beersAuth';
import beersStylesReducer from './beersStyles';

export default combineReducers({
    beers: beersReducer,
    auth: beersAuthReducer,
    styles: beersStylesReducer
})


