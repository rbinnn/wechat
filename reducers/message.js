import { Message } from "../constants";
import { combineReducers } from "redux";
import _ from "lodash";
const assign = Object.assign;
const create = Object.create;

function recent(state = {}, action){
	switch( action.type ){
		case Message.SENDTO:
			var obj = create(null);
			obj[action.id] = (state[action.id] || []).concat(action.list);
			return assign({}, state, obj);
		case Message.GETRECENT:
			// 从后台拿过来的数据合并本地的数据
			var obj = create(null);
			obj[action.id] = _.union( state[action.id] || [], action.list );
			return assign({}, state, obj);
		default:
			return state;
	}
	return state;
}

function unread(state = {}, action){
	switch( action.type ){
		case Message.GETUNREAD:
			var obj = create(null);
			obj[action.id] = (state[action.id] || []).concat(action.list);
			return assign({}, state, obj);
		case Message.READUNREAD:
			var obj = create(null);
			obj[action.id] = [];
			return assign({}, state, obj);
		default:
			return state;
	}
	return state;
}

const message = combineReducers({
	recent,
	unread
});

export default message;