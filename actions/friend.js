import fetch from '../utils/fetch';
import { Friend } from "../constants";
import Api from "../constants/Api";

// 获取好友列表，异步action
function getFriendsList(){
	return (dispatch, getState) => {
		return fetch(Api.getFriends)
  		.then(json => {
  			if( json.statue && json.statue === "error" ){  				
  				dispatch(_getFriendsListError(json.error));
  			}else{
	      		dispatch(_getFriendsListSuccess(json));
  			}
	    })
	    .catch(err => {
	    	dispatch(_getFriendsListError(err))
	    });
	}	
}

function _getFriendsListSuccess(list){
	return {
		type: Friend.GETFRIENDS,
		list
	}
}

function _getFriendsListError(error){
	return {
		type: Friend.GETFRIENDSERROR,
		error
	}
}

// 获取某个好友的信息，异步action
function getFriendInfo(userid){
	return (dispatch, getState) => {
		return fetch(
			Api.getInfo, {
				userid
			},{
				method: "POST"
			})
	  		.then(json => {
	  			if( json.statue && json.statue === "error" ){
	  				dispatch(_getInfoError(json.error));
	  			}else{
		      		dispatch(_getInfoSuccess(userid, json));
	  			}
		    })
		    .catch(err => {
		    	dispatch(_getInfoError(err));
		    });
	}
}

function _getInfoSuccess(userid, data){
	return {
		type: Friend.GETINFO,
		userid,
		data
	}
}

function _getInfoError(error){
	return　{
		type: Friend.GETINFOERROR,
		error
	}
}

// 设置当前与哪个好友聊天，普通action
function setCurrentFriendId(id){
	return {
		type: Friend.CURRENTFRIENDMODAL,
		id
	}
}

// 打开好友信息框，普通action
function openFriendInfoModal(){
	return {
		type: Friend.OPENFRIENDMODAL
	}
}
// 关闭好友信息框，普通action
function closeFriendInfoModal(){
	return {
		type: Friend.CLOSEFRIENDMODAL
	}
}

// 更新好友备注，异步action
function updateRemark(userid, remark){
	return (dispatch, getState) => {
		return fetch(
			Api.setRemark,{
				userid,
				remark
			}, {
				method: "POST"
			})
			.then(json => {
				if( json.statue && json.statue === "success" ){
					dispatch(_updateRemarkSuccess(userid, remark));
				}else{
					dispatch(_updateRemarkFail(json.error));
				}
			})
			.catch(err => {
				dispatch(_updateRemarkFail(err));
			});
	}
}

function _updateRemarkSuccess(userid, remark){
	return {
		type: Friend.UPDATEREMARK,
		userid,
		data: {remark}
	}
}

function _updateRemarkFail(error){
	return {
		type: Friend.UPDATEREMARKERROR,
		error
	}
}

const friend = {
	getFriendsList,
	getFriendInfo,
	setCurrentFriendId,
	openFriendInfoModal,
	closeFriendInfoModal,
	updateRemark
};

export default friend;