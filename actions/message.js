import fetch from '../utils/fetch';
import { Message } from "../constants";
import _ from 'lodash';
import Api from "../constants/Api";

// 异步发送消息
function sendToPost(userid, content){
	return (dispatch, getState) => {
		return fetch(Api.sendMessage,{
			userid, 
			content
		},{
			method: "POST"
		})
		.then(json => {
			if( json.statue && json.statue === "success" ){
				const list = [{
					toUserId: userid,
					time: Date.now(),
					content
				}];
	      		dispatch(_sendToSuccess(userid, list));
  			}else{
  				dispatch(_sendToFail(json.error));
  			}
		})
		.catch( err => {
			dispatch(_sendToFail(err));
		})
		
	}	
}

function _sendToSuccess(id, list){
	return {
		type: Message.SENDTO,
		id,
		list
	}
}

function _sendToFail(error){
	return {
		type: Message.SENDTOERROR,
		error
	}
}

// 未读消息已读，普通action
function readUnread(id){
	return {
		type: Message.READUNREAD,
		id
	}
}

// 获得未读消息, 异步action
function getUnreadPost(){
	return (dispatch, getState) => {
		return _getHasUnread()
		.then(list => {
			return Promise.all( _getUnreadByList(list, dispatch) )
		})
		.then( list => {
			console.log("get unread list : ", list);
		})
		.catch(err => {
			console.log(err);
		})
	}
}

// 根据list生成一组promise对象
function _getUnreadByList(list = [], dispatch){
	var promiseList = [];
	// list的每一个元素好友的id
	_.forEach(list, item => {
		promiseList.push( _getUnreadById(item, dispatch) );
	});
	return promiseList;
}

// 根据userid生成一个promise对象，该对象里面进行fetch异步请求userid对应的未读消息
function _getUnreadById(userid, dispatch){
	return fetch(
		Api.getUnreadMessage,{
			userid
		},{
			method: "POST"
		}
	)
	.then(json => {
		return new Promise((resolve, reject) => {
			if( json.state && json.state === "error" ){
				reject(json.error);
				return;
			}
			dispatch(_getUnread(userid, json));
			resolve(json);			
		});
	})
	.catch(err => {
		return new Promise((resolve, reject) => {
			reject(err);
		});
	});
}

// 发送异步请求查看有无未读消息，返回一个promise对象
function _getHasUnread(){
	return fetch(Api.getHasUnread)
	.then(json => {
		return new Promise((resolve, reject) => {
			if( json.statue && json.statue === "error" ){
				reject(json.error);
				return;
			}
			// 无论有没有未读消息，后台返回过来的都是一个数组，没有未读消息的时候，json是一个空数组
			resolve(json);
		});
	});
}

function _getUnread(id, list){
	return {
		type: Message.GETUNREAD,
		id,
		list
	}
}

// 获得最近消息,异步action
function getRecentPost(userid, number = 20){
	return (dispatch, getState) => {
		return fetch(
			Api.getRecentMessage,{
				userid,
				number
			},{
				method: "POST"
			}
		)
		.then( json => {
			if( json.statue && json.statue === "error" ){
				dispatch(_getRecentFail(json.error));
			}else{
				json = json.reverse();
				dispatch(_getRecentSuccess(userid, json));
			}
		})
		.catch(err => {
			dispatch(_getRecentFail(err));
		});
	}
}

function _getRecentSuccess(id, list){
	return {
		type: Message.GETRECENT,
		id,
		list
	}
}

function _getRecentFail(error){
	return {
		type: Message.GETRECENTERROR,
		error
	}
}

// 将未读消息放到最近消息中
function unreadToRecent(id, list){
	return {
		type: Message.UNREADTORECENT,
		id,
		list
	}
}

const message = {
	sendToPost,
	getUnreadPost,
	readUnread,
	getRecentPost,
	unreadToRecent
}

export default message;