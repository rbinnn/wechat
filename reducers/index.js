import { combineReducers } from "redux";
import statue from "./statue";
import personInfo from "./personInfo";
import friends from "./friends";
import menu from "./menu"
import message from "./message";
import currentChat from './currentChat';


const rootReducer = combineReducers({
	statue,
	menu,
	currentChat,
	personInfo,
	friends,
	message,
});
export default rootReducer;
