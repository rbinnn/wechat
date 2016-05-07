import fetch from '../utils/fetch';
import { Message } from "../constants";
import _ from 'lodash';
import Api from "../constants/Api";

// 发送消息Action
function sendTo(id, list){
	return {
		type: Message.SENDTO,
		id,
		list
	}
}

function sendToFail(error){
	return {
		type: Message.SENDTOERROR,
		error
	}
}

// 获得未读消息
function getUnread(id, list){
	return {
		type: Message.GETUNREAD,
		id,
		list
	}
}

// 未读消息已读
function readUnread(id){
	return {
		type: Message.READUNREAD,
		id
	}
}

// 获得最近消息
function getRecent(id, list){
	return {
		type: Message.GETRECENT,
		id,
		list
	}
}

function getRecentFail(err){
	return {
		type: Message.GETRECENTERROR,
		error
	}
}

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
	      		dispatch(sendTo(userid, list));
  			}else{
  				dispatch(sendToFail(json.error));
  			}
		})
		.catch( err => {
			dispatch(sendToFail(err));
		})
		
	}	
}

// 获得未读消息
function getUnreadPost(){
	return (dispatch, getState) => {
		return getHasUnread
		.then(list => {
			return Promise.all(getUnreadByList(list, dispatch))
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
			dispatch(getUnread(userid, json));
			resolve(json);			
		});
	})
	.catch(err => {
		return new Promise((resolve, reject){
			reject(err);
		});
	});
}

// 发送异步请求查看有无未读消息，返回一个promise对象
function getHasUnread(){
	return fetch(Api.getHasUnread)
	.then(json => {
		return new Promise((resolve, reject) => {
			if( json.statue && json.statue === "error" ){
				reject(json.error);
				return;
			}
			resolve(json);
		});
	});
}

// 发送异步请求获得最近消息
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
				dispatch(getRecentFail(json.error));
			}else{
				dispatch(getRecent(userid, json));
			}
		})
		.catch(err){
			dispatch(getRecentFail(err));
		}
	}
}

const message = {
	sendToPost,
	getUnreadPost,
	readUnread,
	getRecentPost
}

export default message;