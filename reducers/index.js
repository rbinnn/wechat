import { combineReducers } from "redux";
import statue from "./statue";
import personInfo from "./personInfo";
import friends from "./friends";
import message from "./message";


const rootReducer = combineReducers({
	statue,
	personInfo,
	friends,
	message
});
export default rootReducer;
