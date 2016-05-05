import { Statue, PersonInfo } from "../constants";
const assign = Object.assign;

export default function personInfo(state = {}, action){
	switch(action.type){
		case Statue.LOGINED:
			return assign({}, state, { userid: action.userid });
		case PersonInfo.GETINFO:
			return assign({}, state, action.data);
		case PersonInfo.UPDATEINFO:
			return assign({}, state, action.data);
		case PersonInfo.UPDATEINFOERROR:
			return assign({}, state, action.data);
	}
	return state;
}