import { Menu } from "../constants";
export default function menu(state = false, action){
	switch(action.type){
		case Menu.SHOW:
			return true;
		case Menu.HIDE:
			return false;
		default:
			return state;
	}
}