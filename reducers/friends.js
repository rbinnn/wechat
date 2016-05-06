import { Friend } from "../constants";
import { combineReducers } from "redux";
import _ from "lodash";
const assign = Object.assign;


// 控制好友资料模态窗的显示
function friendInfoModal(state = false, action){
	switch(action.type){
		case Friend.OPENFRIENDMODAL:
			return true;
		case Friend.CLOSEFRIENDMODAL:
			return false;
		default:
			return state;
	}
}

// 设置当前点击的是哪个好友
function currentFriendId(state = null, action){
	switch(action.type){
		case Friend.CURRENTFRIENDMODAL:
			return action.id;
		default:
		    return state;
	}
}

// 好友列表
function friendsList(state = [], action){
	switch(action.type){
		case Friend.GETFRIENDS:
			return assign({}, state, action.list);
		case Friend.GETINFO:
		case Friend.UPDATEREMARK:
			const newList = _.extend(state);
			const { data, userid } = action;
			// 更新好友列表中某个好友的信息
			_.some(newList, (item, index) =>{
				if(item.userid === userid){
					newList[index] = assign({}, item, data);
					return true;
				}
				return false;
			});
			return assign({}, state, newList);
		default:
			return state;
	}
}


// const intialState = {
// 	list: [],
// 	currentFriendId: null,
// 	modalVisible: false
// };

const friends = combineReducers({
	list: friendsList,
	currentFriendId: currentFriendId,
	modalVisible: friendInfoModal
});

export default friends;