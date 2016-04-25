import { Statue, Info } from "../constants";
const assign = Object.assign;

export default function personInfo(state = {}, action){
	switch(action.type){
		case Statue.LOGINED:
		return assign({}, state, { userid: action.userid });
	}
	return state;
}