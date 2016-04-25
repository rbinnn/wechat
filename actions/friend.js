import fetch from '../util/fetch';
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

const friend = {
	getFriendsList
};

export default friend;