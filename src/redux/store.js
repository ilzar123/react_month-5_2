import {combineReducers, legacy_createStore as createStore} from "redux";
import {registerReducer} from "./reducers/registerReducer";

const reducer = combineReducers({
    auth: registerReducer,
})

export const store = createStore(reducer)