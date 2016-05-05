import fetch from '../utils/fetch';
import { Friend } from "../constants";
import Api from "../constants/Api";

function getFriendsListSuccess(list){
	return {
		type: Friend.GETFRIENDS,
		list
	}
}

function getFriendsListError(error){
	return {
		type: Friend.GETFRIENDSERROR,
		error
	}
}

function getFriendsList(){
	return (dispatch, getState) => {
		return fetch(Api.getFriends)
  		.then(json => {
  			if( json.statue && json.statue === "error" ){  				
  				dispatch(getFriendsListError(json.error));
  			}else{
	      		dispatch(getFriendsListSuccess(json));
  			}
	    })
	    .catch(err => {
	    	dispatch(getFriendsListError(err))
	    });
	}	
}


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
	  				dispatch(getInfoError(json.error));
	  			}else{
		      		dispatch(getInfoSuccess(userid, json));
	  			}
		    })
		    .catch(err => {
		    	dispatch(getInfoError(err));
		    });
	}
}

function getInfoSuccess(userid,data){
	return {
		type: Friend.GETINFO,
		userid,
		data
	}
}

function getInfoError(error){
	return　{
		type: Friend.GETINFOERROR,
		error
	}
}

function updateRemark(data){
	return (dispatch, getState) => {
		return fetch(
			Api.updateInfo, 
			{
				nickname: data.nickName, 
				// 后台接收的字段跟之前的不一致，要手动改正
				age: data.age,
				sex: data.sex,
				email: data.email,
				introduction: data.introduction
			}, {
				method: "POST"
			})
			.then(json => {
				if( json.statue && json.statue === "success" ){
					dispatch(updateRemarkSuccess(data));
				}else{
					dispatch(updateRemarkFail(json.error));
				}
			})
			.catch(err => {
				dispatch(updateRemarkFail(err));
			});
	}
}

function updateRemarkSuccess(data){
	return {
		type: Friend.UPDATEREMARK,
		data
	}
}

function updateRemarkFail(error){
	return {
		type: Friend.UPDATEREMARKERROR,
		error
	}
}

const friend = {
	getFriendsList,
	getFriendInfo,
	updateRemark
};

export default friend;