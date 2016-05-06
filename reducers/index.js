import { combineReducers } from "redux";
import statue from "./statue";
import personInfo from "./personInfo";
import friends from "./friends";
import menu from "./menu"
import message from "./message";


const rootReducer = combineReducers({
	statue,
	menu,
	personInfo,
	friends,
	message
});
export default rootReducer;
