import { CurrentChat } from "../constants";

export default function currentChat(state = null, action){
	switch(action.type){
		case CurrentChat.SETCURRENTCHAT:
			return action.id;
		default:
			return state;
	}
	return state;
}