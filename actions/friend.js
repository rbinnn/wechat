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

function setCurrentFriendId(id){
	return {
		type: Friend.CURRENTFRIENDMODAL,
		id
	}
}

function openFriendInfoModal(){
	return {
		type: Friend.OPENFRIENDMODAL
	}
}

function closeFriendInfoModal(){
	return {
		type: Friend.CLOSEFRIENDMODAL
	}
}

function getInfoSuccess(userid, data){
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
					dispatch(updateRemarkSuccess(userid, remark));
				}else{
					dispatch(updateRemarkFail(json.error));
				}
			})
			.catch(err => {
				dispatch(updateRemarkFail(err));
			});
	}
}

function updateRemarkSuccess(userid, remark){
	return {
		type: Friend.UPDATEREMARK,
		userid,
		data: {remark}
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
	setCurrentFriendId,
	openFriendInfoModal,
	closeFriendInfoModal,
	updateRemark
};

export default friend;