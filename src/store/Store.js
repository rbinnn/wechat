import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from 'redux-logger';
import rootReducer from "../reducers";

const middlewareArr = [thunkMiddleware, logger()];

function Enhancer(){
	return applyMiddleware(...middlewareArr);
}

export default function Store(initialState){
	const store = createStore(
		rootReducer,
		initialState,
		Enhancer()
	);
	return store;
}