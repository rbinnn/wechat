import { Statue } from "../constants";
const assign = Object.assign;

export default function statue(state = "LOGOUTED", action){
	switch(action.type){
		case Statue.LOGINING: 
			return Statue.LOGINING;
		case Statue.LOGINED:
			return Statue.LOGINED;
		case Statue.LOGOUTED:
			return Statue.LOGOUTED;
		default:
			return state;
	}
}