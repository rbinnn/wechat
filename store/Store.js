import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

function Enhancer(){
	return applyMiddleware(thunkMiddleware);
}

export default function Store(initialState){
	const store = createStore(
		rootReducer,
		initialState,
		Enhancer()
	);

	return store;
}