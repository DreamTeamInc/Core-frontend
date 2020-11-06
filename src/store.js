import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from "redux-form";
import thunk from "redux-thunk";
import userReducer from "./Reducers/userReducer";
import photoReducer from "./Reducers/photoReducer";
import locationReducer from "./Reducers/locationReducer";
import modelReducer from "./Reducers/modelReducer";

let reducers = combineReducers(
    {
        form: formReducer,
        user: userReducer,
        photo: photoReducer,
        location: locationReducer,
        model: modelReducer
    });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

//let store = createStore(reducers, applyMiddleware(thunk));

window.__store__ = store;

export default store;