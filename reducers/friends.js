import { Friend, Message } from "../constants";
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

// 好友列表
function friendsList(state = [], action){
	let newList = [];

	switch(action.type){
		case Friend.GETFRIENDS:
			return assign([], state, action.list);
		case Friend.GETINFO:
		case Friend.UPDATEREMARK:
			let { data, userid } = action;
			newList = _.extend(state);
			// 更新好友列表中某个好友的信息
			_.some(newList, (item, index) =>{
				if( item.userid === userid ){
					newList[index] = assign({}, item, data);
					return true;
				}
				return false;
			});
			return assign([], state, newList);

		case Message.GETUNREAD:
			let friendList = [];
			newList = _.extend(state);
			// 将有新消息的好友从数组拿出
			_.some(newList, (item, index) => {
				if( item.userid === action.id ){
					friendList = newList.splice(index, 1);
					return true;
				}
				return false;
			});
			// 然后放到数组的最开头
			return assign([], state, newList.unshift.apply(newList, friendList));
		default:
			return state;
	}
}


// const intialState = {
// 	list: [],
// 	modalVisible: false
// };

const friends = combineReducers({
	list: friendsList,
	modalVisible: friendInfoModal
});

export default friends;