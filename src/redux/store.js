import { applyMiddleware, combineReducers, createStore } from "redux";
import basketReducer from "./reducers/basketReducer";
import productReducer from "./reducers/productReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers ({basketReducer,productReducer});

export default  createStore(rootReducer,applyMiddleware(thunk));