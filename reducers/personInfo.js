import { Statue, Info } from "../constants";
const assign = Object.assign;

export default function personInfo(state = {}, action){
	switch(action.type){
		case Statue.LOGINED:
			return assign({}, state, { userid: action.userid });
		case Info.GETINFO:
			return assign({}, state, action.data);
		case Info.UPDATEINFO:
			return assign({}, state, action.data);
		case Info.UPDATEINFOERROR:
			return assign({}, state, action.data);
	}
	return state;
}