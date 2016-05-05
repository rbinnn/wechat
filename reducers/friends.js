import { Friend } from "../constants";
const assign = Object.assign;

export default function friends(state = [], action){
	switch(action.type){
		case Friend.GETFRIENDS:
			return action.list;
	}
	return state;
}