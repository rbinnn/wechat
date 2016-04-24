import { combineReducers } from "redux";
import statue from "./statue";
import personInfo from "./personInfo";
import friendsList from "./friendsList";
import message from "./message";


const rootReducer = combineReducers({
	statue,
	personInfo,
	friendsList,
	message
});
export default rootReducer;
