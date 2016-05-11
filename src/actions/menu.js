import { Menu } from "../constants";
function showMenu(){
	return {
		type: Menu.SHOW
	}
}

function hideMenu(){
	return {
		type: Menu.HIDE
	}
}

const menu = {
	showMenu,
	hideMenu
}

export default menu;